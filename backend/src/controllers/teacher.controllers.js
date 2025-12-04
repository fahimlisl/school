import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Teacher } from "../models/teacher.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { options } from "../utils/options.js";
import { Student } from "../models/student.models.js";
import { Marksheet } from "../models/marksheet.models.js";

const generateAcessAndRefreshToken = async (userId) => {
  try {
    const user = await Teacher.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(401, "error while generating access and refresh token");
  }
};

const registerTeacher = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, subject, password, classAssigned } =
    req.body;

  if (
    [fullName, email, phoneNumber, subject, password, classAssigned].some(
      (f) => !f && f !== 0
    )
  ) {
    throw new ApiError(401, "all fields are required");
  }

  const ifTeacher = await Teacher.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (ifTeacher) {
    throw new ApiError(400, "teacher already exists");
  }

  const teacher = await Teacher.create({
    fullName,
    email,
    phoneNumber,
    subject,
    password,
    classAssigned,
  });

  if (!teacher) {
    throw new ApiError(
      500,
      "internal server error ,not able to create the teacher"
    );
  }

  console.log(`teacher creted successfully`); // gotta delete this line after checkout

  return res
    .status(200)
    .json(new ApiResponse(200, teacher, "teacher creted successfully"));
});

const loginTeacher = asyncHandler(async (req, res) => {
  const { phoneNumber, email, password } = req.body;

  if (!phoneNumber && !email) {
    throw new ApiError(400, "phone number or email required");
  }

  if (!password) {
    throw new ApiError(400, "password must required");
  }

  const loggingTeacher = await Teacher.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (!loggingTeacher) {
    throw new ApiError(400, "invalid credentials");
  }

  const checkPassword = await loggingTeacher.isPasswordCorrect(password);

  if (!checkPassword) {
    throw new ApiError(401, "pasword is wrong");
  }

  const { accessToken, refreshToken } = await generateAcessAndRefreshToken(
    loggingTeacher._id
  );

  const loggedInTeacher = await Teacher.findById(loggingTeacher._id).select(
    "-password -refreshToken"
  );

  console.log("im i getting corerect foemat of refrehsToken ", refreshToken);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {  loginUser: loggedInTeacher, accessToken, refreshToken},
        "teacher logged in successfully"
      )
    );
});

const logOutTeacher = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log(req.user._id);
  if (!userId) {
    throw new ApiError(
      400,
      "userId wasn't able to found , unauthroized access"
    );
  }

  const user = await Teacher.findById(userId);

  if (!user) {
    throw new ApiError(400, "tacher doesn't exist");
  }

  await Teacher.findByIdAndUpdate(
    userId,
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
    .json(new ApiResponse(200, {}, "user logged out successfully"));
});

// not tusing this method now , getting a lil complex , will upgrade to id , after getting replacement form the last one

// const assignMarksToStudent = asyncHandler(async (req, res) => {
//   const teacherId = req.user._id;
//   const studentId = req.params.id;

//   const { obtainedMarks } = req.body;
//   if (!obtainedMarks) {
//     throw new ApiError(400, "obtains marks required");
//   }

//   const updatedMarksheet = await Marksheet.updateOne(
//     {
//       student: studentId,
//       "terms.subjects.teacher": teacherId,
//       // "terms.term":1
//     },
//     {
//       $set: {
//         // "subjects.$.obtainedMarks": obtainedMarks,
//         // "subjects.$.isSubmitted": true,
//         "terms.$[term].subjects.$[sub].obtainedMarks":obtainedMarks,
//         "terms.$[term].subjects.$[sub].isSubmitted":true
//       },
//     },

//   {
//     arrayFilters: [
//       { "terms.term": term },                      // matches selected term
//       {
//         "sub.subjectName": subjectName.toLowerCase(),
//         "sub.teacher": teacherId                  // ensures teacher owns subject
//       }
//     ]
//   }
//   );

//   if (updatedMarksheet.modifiedCount === 0) {
//     throw new ApiError(
//       403,
//       "You are not allowed to update this subject OR subject not found."
//     );
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "Marks updated successfully"));
// });

const assignMarksToStudent = asyncHandler(async (req, res) => {
  const teacherId = req.user._id;
  const studentId = req.params.id;

  const { term, obtainedMarks } = req.body;
  // const term = 1;  // i can hardcore if i want later

  if (!obtainedMarks) {
    throw new ApiError(400, "obtainedMarks required");
  }

  const marksheet = await Marksheet.findOne({ student: studentId });

  if (!marksheet) {
    throw new ApiError(404, "Marksheet not found");
  }

  const termObj = marksheet.terms.find((t) => t.term === term);

  if (!termObj) {
    throw new ApiError(404, "Term not found");
  }

  // finding the subject where the teacherId matches
  const subjectObj = termObj.subjects.find(
    (s) => String(s.teacher) === String(teacherId)
  );
  if (!subjectObj) {
    throw new ApiError(403, "You are not allowed to update this subject");
  }

  subjectObj.obtainedMarks = obtainedMarks;
  subjectObj.isSubmitted = true;

  // logic for percentage calculation

  const eachPercentage = ((obtainedMarks / subjectObj.maxMarks) * 100).toFixed(
    2
  );
  subjectObj.percentage = eachPercentage;

  // total percentage logic
  const allSubjects = termObj.subjects;
  let totalObtainedNumbers = [];
  let totalMarks = [];
  allSubjects.forEach((e) => {
    totalObtainedNumbers.push(e.obtainedMarks);
  });
  allSubjects.forEach((e) => {
    totalMarks.push(e.maxMarks);
  });

  let totalObtained = 0;
  for (let i = 0; i < totalObtainedNumbers.length; i++) {
    totalObtained = totalObtained + totalObtainedNumbers[i];
  }
  let total = 0;
  for (let i = 0; i < totalMarks.length; i++) {
    total += totalMarks[i];
  }

  const totalPercentage = ((totalObtained / total) * 100).toFixed(2);

  termObj.percentage = totalPercentage;

  await marksheet.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Marks updated successfully"));
});

export { registerTeacher, loginTeacher, logOutTeacher, assignMarksToStudent };
