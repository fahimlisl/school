import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const studnetSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // this field is gonna be optional , as per the requirement
    },
    gurdianName: {
      type: String,
      required: true,
    },
    currentClass: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    feeStructure: {
      type: Schema.Types.ObjectId,
      ref: "Fee",
    },
    admissionDate: {
      type: String, // need to change the type from string to date
    },
    refreshToken: {
      type: String,
    },
    feesPaid: {
      jan: { type: Boolean, default: false },
      feb: { type: Boolean, default: false },
      march: { type: Boolean, default: false },
      april: { type: Boolean, default: false },
      may: { type: Boolean, default: false },
      jun: { type: Boolean, default: false },
      july: { type: Boolean, default: false },
      august: { type: Boolean, default: false },
      september: { type: Boolean, default: false },
      october: { type: Boolean, default: false },
      november: { type: Boolean, default: false },
      december: { type: Boolean, default: false },
      admissionFee: { type: Boolean, default: false },
      adittionalFees: { type: Boolean, default: false },
    },

    // have to add more fields like result of previous class , and the permission of uploading fields will be only avaible for admin and teacher no one outside admin and teacher can add those fields
  },
  { timestamps: true }
);

studnetSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studnetSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studnetSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

studnetSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const Student = mongoose.model("Student", studnetSchema);
