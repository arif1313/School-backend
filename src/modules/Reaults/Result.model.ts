import { Schema, model } from "mongoose";
import { IResult } from "./Result.Interface";


const SubjectSchema = new Schema(
  {
    name: { type: String, required: true },
    tutorialMark: { type: Number, required: true, min: 0, max: 20 },
    writtenMark: { type: Number, required: true, min: 0 },
    mcqMark: { type: Number, required: true, min: 0 },
    totalMark: { type: Number, required: true },
  },
  { _id: false }
);

const ResultSchema = new Schema<IResult>(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    examType: { 
      type: String, 
      required: true, 
      enum: ["1st Term", "Half Yearly", "Final"]
    },
    year: { type: Number, required: true },
    subjects: { type: [SubjectSchema], required: true },
    totalMarks: { type: Number, required: true },
    average: { type: Number, required: true },
    grade: { type: String, required: true },
  },
  { timestamps: true }
);

export const ResultModel = model<IResult>("Result", ResultSchema);
