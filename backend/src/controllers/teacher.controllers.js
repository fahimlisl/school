import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Teacher } from "../models/teacher.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { options } from "../utils/options.js";

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
        [loggingTeacher, accessToken, refreshToken],
        "teacher logged in successfully"
      )
    );
});

const assignMarksToStudent = asyncHandler(async (req, res) => {
  // const { subject } = req.params.id.subject // write verifyJWTTeacher then proceded ,,,,
  // 9480801058
});

export { registerTeacher, loginTeacher };
