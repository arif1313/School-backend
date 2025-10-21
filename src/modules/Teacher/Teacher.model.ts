import { Schema, model, Model } from "mongoose";
import { ITeacher } from "./Teacher.interface";

const TeacherSchema = new Schema<ITeacher>(
  {
    // 🔹 Basic Info
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },

    // 🔹 Academic Info
    teacherId: { type: String, unique: true },
    subject: { type: String, required: true },
    classesAssigned: { type: [Number], default: [] },
    joinDate: { type: Date },

    // 🔹 Optional Personal Info
    address: { type: String },
    qualification: { type: String },
    experience: { type: String },

    // 🔹 Meta
    role: { type: String, default: "teacher" },
  },
  { timestamps: true }
);

// Auto-generate teacherId and joinDate
TeacherSchema.pre("save", function (next) {
  if (!this.teacherId) {
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.floor(1000 + Math.random() * 9000);
    this.teacherId = `TCH${new Date().getFullYear()}${timestamp}${random}`;
  }
  if (!this.joinDate) this.joinDate = new Date();
  next();
});

export const TeacherModel: Model<ITeacher> = model<ITeacher>("Teacher", TeacherSchema);
