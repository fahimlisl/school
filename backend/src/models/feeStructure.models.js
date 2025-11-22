import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    classAssign: {
      type: Number,
      required: true,
      unique: true,
    },
    monthlyFees: {
        jan: { type: Number },
        feb: { type: Number },
        march: { type: Number },
        april: { type: Number },
        may: { type: Number },
        jun: { type: Number },
        july: { type: Number },
        august: { type: Number },
        september: { type: Number },
        october: { type: Number },
        november: { type: Number },
        december: { type: Number },
    },
    admissionFee: {
      type: Number,
    },
    adittionalFees: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Fee = mongoose.model("Fee", feeSchema);
