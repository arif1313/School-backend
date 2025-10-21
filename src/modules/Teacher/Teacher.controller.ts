import { Request, Response } from "express";
import { AuthRequest } from "../../Middelware/auth";
import {
  createTeacherService,
  updateTeacherService,
  getAllTeachersService,
  getTeacherByIdService,
  deleteTeacherService,
} from "./Teacher.service";
import {
  teacherCreateValidationSchema,
  teacherUpdateValidationSchema,
} from "./Teacher.validation";

// 🔹 Create Teacher (only management can create)
export const createTeacher = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "management")
      return res.status(403).json({ message: "Only management can create a teacher" });

    const { error, value } = teacherCreateValidationSchema.validate(req.body, { stripUnknown: true });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const teacher = await createTeacherService(value);
    res.status(201).json({ message: "Teacher created successfully", teacherId: teacher.teacherId });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Update Teacher
export const updateTeacher = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "management")
      return res.status(403).json({ message: "Only management can update teacher info" });

    const { error, value } = teacherUpdateValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updated = await updateTeacherService(req.params.id, value);
    res.status(200).json({ message: "Teacher updated successfully", updated });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// 🔹 Get All Teachers
export const getAllTeachers = async (_req: Request, res: Response) => {
  try {
    const teachers = await getAllTeachersService();
    res.status(200).json(teachers);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Get Teacher by ID
export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await getTeacherByIdService(req.params.id);
    res.status(200).json(teacher);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// 🔹 Delete Teacher
export const deleteTeacher = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "management")
      return res.status(403).json({ message: "Only management can delete a teacher" });

    const deleted = await deleteTeacherService(req.params.id);
    res.status(200).json({ message: "Teacher deleted successfully", deleted });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
