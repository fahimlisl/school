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
    DOB
  } = req.body;

  if (!admissionDate) {
    throw new ApiError(400,"admission date required")
  }

  if (!DOB) {
    throw new ApiError(400,"date of birth of studnet is required")
  }

  if (
    [
      fullName,
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


  const feeS = await Fee.findOne({ classAssign: currentClass });

  if (!feeS) {
    throw new ApiError(
      500,
      "fee sturecutre for the speicified class wasn't able to found"
    );
  }

  // password ddmmyyyy format
const formatDOBPassword = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
};

const dobPassword = formatDOBPassword(DOB)

  const createdStudent = await Student.create({
    fullName,
    email,
    phoneNumber,
    currentClass,
    gurdianName,
    DOB:new Date(DOB),
    password:dobPassword,
    section,
    admissionDate:new Date(admissionDate),
    profilePhoto: uploadedFile.url || "",
    feeStructure: feeS._id,
    feesPaid: {
    jan: false,
    feb: false,
    march: false,
    april: false,
    may: false,
    jun: false,
    july: false,
    august: false,
    september: false,
    october: false,
    november: false,
    december: false,
    admissionFee: feesPaid === true, 
    adittionalFees: false,
  },
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
      const teacher = await Teacher.findOne({
        subject: sub.toLowerCase(),
        classAssigned: {$in:[currentClass]}
      });

      return {
        subjectName: sub.toLowerCase(),
        maxMarks: 100,
        obtainedMarks: 0,
        teacher: teacher ? teacher._id : null,
        isSubmitted: false,
      };
    })
  );

  const termsArray = [1,2,3].map(term => ({
    term,
    subjects: assignedSubjects.map(s => ({
      ...s,
          obtainedMarks: 0,
    isSubmitted: false
    }))
  }))

  const wholeMarksheet = await Marksheet.create({
    student: createdStudent._id,
    terms:termsArray
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
          // foundStudnet: loggedInStudent,
          loginUser: loggedInStudent,
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
  ).populate("marksheet");

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
