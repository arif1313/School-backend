import { Response } from "express";
import {
  createStudentService,
  updateStudentService,
  getAllStudentsService,
  getStudentByIdService,
  deleteStudentService,
} from "./Student.service";
import { studentCreateValidationSchema, studentUpdateValidationSchema } from "./Student.validation";
import { AuthRequest } from "../../Middelware/auth";
// 🔹 Create student
export const createStudent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !["teacher", "management"].includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Unauthorized access" });
    }

    const { error, value } = studentCreateValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const student = await createStudentService(value);
    res.status(201).json({ message: "Student created successfully", student });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Update student
export const updateStudent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !["teacher", "management"].includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Unauthorized access" });
    }

    const { error, value } = studentUpdateValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedStudent = await updateStudentService(req.params.id, value);
    res.status(200).json({ message: "Student updated successfully", updatedStudent });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Get all students
export const getAllStudents = async (_req: AuthRequest, res: Response) => {
  try {
    const students = await getAllStudentsService();
    res.status(200).json(students);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Get single student
export const getStudentById = async (req: AuthRequest, res: Response) => {
  try {
    const student = await getStudentByIdService(req.params.id);
    res.status(200).json(student);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// 🔹 Delete student
export const deleteStudent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !["teacher", "management"].includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Unauthorized access" });
    }

    const deleted = await deleteStudentService(req.params.id);
    res.status(200).json({ message: "Student deleted successfully", deleted });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
