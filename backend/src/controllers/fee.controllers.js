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

const fetchFee = asyncHandler( async(req,res) => {
  const fees = await Fee.find({})

  if(!fees) throw new ApiError(500 , "was unable to fetch fees")

  console.log(fees)
 
  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      fees,
      "fetched all the fees"
    )
  )
})


const updateFeeStructure = asyncHandler(async (req, res) => {
  const feeId = req.params.id;


  const {
    jan, feb, march, april, may, jun,
    july, august, september, october, november, december,
    admissionFee, adittionalFees
  } = req.body;


  const updateFields = {};

  if (jan !== undefined) updateFields["monthlyFees.jan"] = jan;
  if (feb !== undefined) updateFields["monthlyFees.feb"] = feb;
  if (march !== undefined) updateFields["monthlyFees.march"] = march;
  if (april !== undefined) updateFields["monthlyFees.april"] = april;
  if (may !== undefined) updateFields["monthlyFees.may"] = may;
  if (jun !== undefined) updateFields["monthlyFees.jun"] = jun;
  if (july !== undefined) updateFields["monthlyFees.july"] = july;
  if (august !== undefined) updateFields["monthlyFees.august"] = august;
  if (september !== undefined) updateFields["monthlyFees.september"] = september;
  if (october !== undefined) updateFields["monthlyFees.october"] = october;
  if (november !== undefined) updateFields["monthlyFees.november"] = november;
  if (december !== undefined) updateFields["monthlyFees.december"] = december;

  if (admissionFee !== undefined) updateFields["admissionFee"] = admissionFee;
  if (adittionalFees !== undefined) updateFields["adittionalFees"] = adittionalFees;

  const updated = await Fee.findByIdAndUpdate(
    feeId,
    { $set: updateFields },
    { new: true }
  );

  if (!updated) {
    throw new ApiError(404, "Fee structure not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Fee structure updated successfully"));
});


export { feeRegister , fetchFee ,updateFeeStructure};
