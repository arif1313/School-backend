import express from "express";
import {
  createStudent,
  updateStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
} from "./Student.controller";
import { authenticate, authorizeCreate } from "../../Middelware/auth";

const router = express.Router();

// 🔐 Protected routes with authentication
router.post("/create", authenticate, authorizeCreate(["teacher", "management"]), createStudent);
router.put("/update/:id", authenticate, updateStudent);
router.get("/all", authenticate, getAllStudents);
router.get("/:id", authenticate, getStudentById);
router.delete("/:id", authenticate, deleteStudent);

export const StudentRoutes = router;
