import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OnlineStudent } from "../models/onlineRegistration.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const studentRegistration = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    previousClass,
    desiredClass,
    motherSName,
    familyIncome,
    fatherSName,
    address,
  } = req.body;

  if (
    [
      fullName,
      email,
      phoneNumber,
      previousClass,
      desiredClass,
      motherSName,
      familyIncome,
      fatherSName,
      address,
    ].some((field) => !field && field !== 0)
  ) {
    throw new ApiError(401, "all fields are requied");
  }

  const user = await OnlineStudent.findOne({
    $or: [{ phoneNumber }, { email }],
  });

  if (user) {
    throw new ApiError(401, "user already exists");
  }

  // const passportPhotoFile = req.files?.passportPhoto[0]?.path;
  // const marskeehtPhotoFile = req.files?.marksheetPhoto[0]?.path;
  const passportPhotoFile = req.files?.passportPhoto[0].buffer;
  const marskeehtPhotoFile = req.files?.marksheetPhoto[0].buffer;


  const passport = await uploadOnCloudinary(passportPhotoFile);
  const marksheet = await uploadOnCloudinary(marskeehtPhotoFile);

  if (!passport) {
    console.log(
      `passportPhoto is not found , code stuck at  contorller of onlineRegistration`
    );
  }

  if (!marksheet) {
    console.log(
      `marsheetPhoto is not found , code stuck at contorller of onlineRegistration`
    ); // add apiError here
  }

  const createdStudent = await OnlineStudent.create({
    fullName,
    email,
    phoneNumber,
    address,
    motherSName,
    familyIncome,
    fatherSName,
    desiredClass,
    previousClass,
    passportPhoto: passport.url,
    marksheetPhoto: marksheet.url,
  });

  const checkCreatedUser = await OnlineStudent.findById(createdStudent._id);

  if (!checkCreatedUser) {
    throw new ApiError(500, "something went wrong while creating the user");
  }
  console.log(`studnet registered susccesfully`);
  return res
    .status(200)
    .json(new ApiResponse(200, createdStudent, "user created Successfully"));
});


export { studentRegistration };
// get user details from frontend
// validation - not empty not repetitive
// checke if user already exist : username, email
// cehck for images, cehck for avatar , and  file uploading through multer and cloduinary
// upload them to cloudinary , avatar
// create user obejct - create entry in db
// remove password and refresh token field from response
// chec for user creation
// return response back
