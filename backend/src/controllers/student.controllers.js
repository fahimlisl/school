import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { options } from "../utils/options.js";
import { Fee } from "../models/feeStructure.models.js";
import { Marksheet } from "../models/marksheet.models.js";
import { Teacher } from "../models/teacher.models.js";

const subjectTemplate = {
  1: ["Math", "English", "Bengali", "SST", "Geography"],
  2: ["Math", "English", "Bengali", "SST", "Biology"],
  3: ["Math", "English", "Physic", "Chemsitry", "SST"],
  4: ["Math", "English", "Biology", "Chemsitry"],
};

const generateAccessAndRefreshToken = async function (userId) {
  const userS = await Student.findById(userId);

  const accessToken = userS.generateAccessToken();
  const refreshToken = userS.generateRefreshToken();

  userS.refreshToken = refreshToken;
  userS.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerStudent = asyncHandler(async (req, res) => {
  const {
    fullName,
    phoneNumber,
    password,
    email,
    gurdianName,
    currentClass,
    section,
    admissionDate,
    feesPaid,
  } = req.body;

  console.log(
    `checking wheather im receving the body by fullName : ${fullName}`
  );
  if (
    [
      fullName,
      password,
      email,
      gurdianName,
      section,
      currentClass,
      phoneNumber,
    ].some((f) => !f && f !== 0)
  ) {
    throw new ApiError(401, "all fields are required");
  }

  const fstudent = await Student.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (fstudent) {
    throw new ApiError(
      401,
      "studnet already exists , created by the same phonenumber and email"
    );
  }

  const profilePhotoPath = req.file?.path;

  if (!profilePhotoPath) {
    throw new ApiError(401, "profile Photo required to proccede");
  }

  const uploadedFile = await uploadOnCloudinary(profilePhotoPath);

  console.log(`file uploaded successfully link is ${uploadedFile.url}`); // im goonna remove this console at the end after checking the api

  const feeS = await Fee.findOne({ classAssign: currentClass });

  if (!feeS) {
    throw new ApiError(
      500,
      "fee sturecutre for the speicified class wasn't able to found"
    );
  }

  console.log(`logging what is feeS is ${feeS}`);

  const createdStudent = await Student.create({
    fullName,
    email,
    phoneNumber,
    currentClass,
    gurdianName,
    password,
    section,
    admissionDate,
    profilePhoto: uploadedFile.url || "",
    feeStructure: feeS._id,
    feesPaid,
  });

  if (!createdStudent) {
    throw new ApiError(
      500,
      "internal server error , fialed to created studnet"
    );
  }

  //writing marlksheet logic here

  // const letsSee = await Promise.all(
  //   respectiveSub.map(sub => Teacher.findOne({ subject: sub }))
  // )

  // console.log(letsSee)

  // const teacherIds = letsSee.map(t => t._id)

  // console.log(teacherIds)
  
  const respectiveSub = subjectTemplate[currentClass];

  const assignedSubjects = await Promise.all(
    respectiveSub.map(async (sub) => {
      const teacher = await Teacher.findOne({ subject: sub });

      return {
        subjectName: sub,
        maxMarks: 100,
        obtainedMarks: 0,
        teacher: teacher ? teacher._id : null,
        isSubmitted: false,
      };
    })
  );

  // const assignedMarksheet = subjectTemplate[currentClass];

  // const subjectObject = assignedMarksheet.map((sub) => ({
  //   subjectName: sub,
  //   maxMarks: 100,
  //   obtainedMarks: 0,
  //   teacher: null,
  //   isSubmitted: false,
  // }));

  const wholeMarksheet = await Marksheet.create({
    student: createdStudent._id,
    subjects: assignedSubjects,
  });

  await Student.findByIdAndUpdate(createdStudent._id, {
    $set: {
      marksheet: wholeMarksheet._id,
    },
  });

  const finalStudnet = await Student.findById(createdStudent._id)
    .populate("marksheet")
    .populate("feeStructure");

  return res
    .status(200)
    .json(new ApiResponse(200, finalStudnet, "student created successfully"));
});

const loginStudent = asyncHandler(async (req, res) => {
  const { phoneNumber, email, password } = req.body;

  if (!phoneNumber && !email) {
    throw new ApiError(401, "any of phonenumbner or emails required");
  }

  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const foundStudnet = await Student.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (!foundStudnet) {
    throw new ApiError(400, "user does't exist");
  }

  const checkPassword = await foundStudnet.isPasswordCorrect(password);

  if (!checkPassword) {
    throw new ApiError(400, "please enter correct password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    foundStudnet._id
  );

  const loggedInStudent = await Student.findById(foundStudnet._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          foundStudnet: loggedInStudent,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
});

const logOutStudent = asyncHandler(async (req, res) => {
  const user = await Student.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "student logged out successfully"));
});

const getStudentProfile = asyncHandler(async (req, res) => {
  // req.params._id // returns undefiend
  const studentId = req.params.id;
  console.log(`this is req.params.id ${req.params.id}`);

  // req.params.id // returns the proper thing ,

  // 'req.params' doesn't specifilcly returns anything , gotta dive more deep into it

  const wantedStudent = await Student.findById(studentId).populate(
    "feeStructure"
  );

  if (!wantedStudent) {
    throw new ApiError(400, "studnet wasn't found!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, wantedStudent, "student data fetched successfully")
    );
});

export { registerStudent, loginStudent, getStudentProfile, logOutStudent };
