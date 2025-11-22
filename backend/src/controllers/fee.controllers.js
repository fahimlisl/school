import { Fee } from "../models/feeStructure.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const feeRegister = asyncHandler(async (req, res) => {
  const {
    classAssign,
    monthlyFees,
    admissionFee,
    adittionalFees,
  } = req.body;

  if (
    [
      classAssign,
      monthlyFees,
      admissionFee,
      adittionalFees,
    ].some((f) => !f && f !== 0)
  ) {
    throw new ApiError(401, "each fee field required");
  }

  const feeReady = await Fee.findOne({
    $or: [{ classAssign }],
  });

  if (feeReady) {
    throw new ApiError(
      401,
      "this class fee is already assigned, editing option coming soon"
    );
  }

  const createFee = await Fee.create({
    classAssign,
    monthlyFees,
    admissionFee,
    adittionalFees,
  });


  if (!createFee) {
    throw new ApiError(500,"unable to create fee structrue , ")
  }

  return res
  .status(200)
  .json(
    new ApiResponse(
        200,
        createFee,
        "fee structure created successfully"
    )
  )

});

export { feeRegister };
