import express from "express";
import {
  createTeacher,
  updateTeacher,
  getAllTeachers,
  getTeacherById,
  deleteTeacher,
} from "./Teacher.controller";
import { authenticate } from "../../Middelware/auth";

const router = express.Router();

// Routes
router.post("/create", authenticate, createTeacher);
router.put("/update/:id", authenticate, updateTeacher);
router.get("/all", authenticate, getAllTeachers);
router.get("/:id", authenticate, getTeacherById);
router.delete("/:id", authenticate, deleteTeacher);

export const TeacherRoutes = router;
