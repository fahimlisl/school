import mongoose, { Schema } from "mongoose";


const subjectSchema = new mongoose.Schema({
  subjectName: {
          type: String ,
          required: true,
        },
        maxMarks: {
          type: Number,
          default: 100,
        },
        obtainedMarks: {
          type: Number,
          default: 0,
        },
        teacher: {
          type: Schema.Types.ObjectId,
          ref: "Teacher",
        },
        percentage:{
          type:Number,
          default:0,
        },
        isSubmitted: {
          type: Boolean,
          default: false,
        },
},{timestamps:true})

const termSchema = new mongoose.Schema({
  term:{
    type:Number,
    enum:[1,2,3]
  },
    subjects: [subjectSchema],
    percentage: { type: Number, default: 0 },

},{timestamps:false})

const marksheetSchema = new mongoose.Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      unique: true,
      required: true,
    },
    // subjects: [
    //   {
    //     subjectName: {
    //       type: String ,
    //       required: true,
    //     },
    //     maxMarks: {
    //       type: Number,
    //       default: 100,
    //     },
    //     obtainedMarks: {
    //       type: Number,
    //       default: 0,
    //     },
    //     teacher: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Teacher",
    //     },
    //     isSubmitted: {
    //       type: Boolean,
    //       default: false,
    //     },
    //   },
    // ],

    terms:[termSchema],
    total: { type: Number, default: 0 },
    // percentage: { type: Number, default: 0 },
    grade: { type: String, default: "N/A" },
  },
  { timestamps: true }
);

export const Marksheet = mongoose.model("Marksheet", marksheetSchema);
