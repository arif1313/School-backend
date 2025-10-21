import { Schema, model, Model } from "mongoose";
import { IStudent } from "./Student.Interface";


// Define the schema
const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    contact: { type: String },
    studentId: { type: String, unique: true },
    class: { type: Number, required: true, min: 1, max: 10 },
    rollNumber: { type: Number, required: true },
    section: { type: String },
    admissionYear: { type: Number },
    admissionDate: { type: Date },
    guardianName: { type: String },
    guardianPhone: { type: String },
    address: { type: String },
    role: { type: String, default: "student" },
  },
  { timestamps: true }
);

// 🔹 Auto-generate fields before save
StudentSchema.pre("save", function (next) {
  if (!this.studentId) {
    const uniquePart = Date.now().toString().slice(-4);
    this.studentId = `STU${new Date().getFullYear()}${uniquePart}`;
  }
  if (!this.admissionYear) {
    this.admissionYear = new Date().getFullYear();
  }
  if (!this.admissionDate) {
    this.admissionDate = new Date();
  }
  next();
});


export const StudentModel: Model<IStudent> = model<IStudent>("Student", StudentSchema);
