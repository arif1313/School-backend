import { Request, Response } from "express";
import { comparePassword, generateToken } from "./auth.service";
import { StudentModel } from "../modules/Student/Student.model";
import { TeacherModel } from "../modules/Teacher/Teacher.model";
import { ManagementModel } from "../modules/ManageMent/Mangement.model";

export const login = async (req: Request, res: Response) => {
  try {
    // ✅ Safe destructure (prevents crash if req.body undefined)
    const { contact, password } = req.body || {};

    // ✅ Validate inputs
    if (!contact || !password) {
      return res.status(400).json({ message: "Contact & password required" });
    }

    let user: any = null;
    let role: "student" | "teacher" | "management" | null = null;

    // 🔹 Try Student
    user = await StudentModel.findOne({
      $or: [{ email: contact }, { phone: contact }],
    });
    if (user) role = "student";

    // 🔹 Try Teacher
    if (!user) {
      user = await TeacherModel.findOne({
        $or: [{ email: contact }, { phone: contact }],
      });
      if (user) role = "teacher";
    }

    // 🔹 Try Management
    if (!user) {
      user = await ManagementModel.findOne({
        $or: [{ email: contact }, { phone: contact }],
      });
      if (user) role = "management";
    }

    // ❌ No user found
    if (!user || !role) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔹 Compare password
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔹 Generate JWT
    const token = generateToken({ id: user._id, role });

    // ✅ Successful login
    return res.status(200).json({
      message: "Login successful",
      token,
      role,
      id: user._id,
      name: user.name,
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err?.message || err,
    });
  }
};
