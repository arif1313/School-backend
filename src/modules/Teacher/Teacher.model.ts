import { Schema, model, Model } from "mongoose";
import { ITeacher } from "./Teacher.interface";


const TeacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    teacherId: { type: String, unique: true },
    subject: { type: String, required: true },
    classesAssigned: { type: [Number], required: true },
    joinDate: { type: Date },
    address: { type: String },
    qualification: { type: String },
    experience: { type: String },
    role: { type: String, default: "teacher" },
  },
  { timestamps: true }
);

// Auto-generate teacherId and joinDate
TeacherSchema.pre("save", function (next) {
  if (!this.teacherId) {
    const uniquePart = Date.now().toString().slice(-4);
    this.teacherId = `TCH${new Date().getFullYear()}${uniquePart}`;
  }
  if (!this.joinDate) {
    this.joinDate = new Date();
  }
  next();
});

export const TeacherModel: Model<ITeacher> = model<ITeacher>("Teacher", TeacherSchema);
