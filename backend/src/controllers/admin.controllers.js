import { Admin } from "../models/admin.models.js";
import { Student } from "../models/student.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";



const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await Admin.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      401,
      `error while generating access and refresh token ${error}`
    );
  }
};

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((fild) => fild.trim() === "")) {
    throw new ApiError(401, "all fields are required");
  }

  const admin = await Admin.create({
    username,
    email,
    password,
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  if (!createdAdmin) {
    throw new ApiError(
      500,
      "internal erorr , admin was not abel to be created"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, admin, "admin created sucessfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(401, "username or email requied");
  }

  if (!password) {
    throw new ApiError(401, "password required");
  }

  const loginUser = await Admin.findOne({
    $or: [{ email }, { username }],
  });

  if (!loginUser) {
    throw new ApiError(401, "user doesn't exist");
  }

  const checkPassword = await loginUser.isPasswordCorrect(password);

  if (!checkPassword) {
    throw new ApiError(401, "please enter correct password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    loginUser._id
  );

  // accessToken(loginUser._id)
  // refreshToken(loginUser._id)
  const loggedInUserAlready = await Admin.findById(loginUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { loginUser: loggedInUserAlready, accessToken, refreshToken },
        "admin logged in successfully"
      )
    );
});

const logOutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.user._id,
    {
    //   $set: {
    //     refreshToken: undefined,
    //   },
         $unset: { refreshToken: "" } ,   
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .clearCookie("refreshToken",options)
  .clearCookie("accessToken", options)
  .json(new ApiResponse(
    200,
    {},
    `admin logged out successfully`
  ))
});


const changePassword = asyncHandler( async(req,res) => {
    try {
        const {oldPassword,newPassword} = req.body

        if ([oldPassword,newPassword].some((field) => field.trim() === "")) {
          throw new ApiError(401,"both fields are required")
        }

        const passuser = await Admin.findById(req.user._id)
        const validPassword = await passuser.isPasswordCorrect(oldPassword)

        if (!validPassword) {
          throw new ApiError(401,"old password is wrong")
        }

        passuser.password = newPassword
        await passuser.save({validateBeforeSave:false})
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "password has been changed successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401,error.message || `error occoured in cntorller of changing password`)
    }

})


const fetchAllStudents = asyncHandler( async(req,res) => {
  const getClass = Number(req.params.id)
  console.log(`getting proper getClass property ${getClass}`)


  const students = await Student
    .find({ currentClass: getClass })
    .populate("feeStructure");

  // const students = await Student.aggregate([
  //   {
  //     $match:{
  //       "currentClass" : getClass
  //     }
  //   }
  // ])
//   await Student.aggregate([
//   { $match: { currentClass: getClass }},
//   { $lookup: {
//       from: "fees",
//       localField: "feeStructure",
//       foreignField: "_id",
//       as: "feeStructure"
//   }},
//   { $addFields: { feeStructure: { $first: "$feeStructure" }}}
// ])

// would add aggregate when be doing more filtered data collection


  if (students.length===0) {
    throw new ApiError(400,"no such studnets found form this class")
  }

  console.log("fetched student of that clsas are ", students)

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      students,
      `studnets of class ${getClass} has been succesfully fetched`
    )
  )
})


export { 
    registerAdmin,
    loginAdmin, 
    logOutAdmin, 
    changePassword,
    fetchAllStudents
};
