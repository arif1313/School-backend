import express from "express";
import {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
  getResultsByStudent,
  getResultsByClass,
} from "./Result.controller";
import { authenticate } from "../../Middelware/auth";

const router = express.Router();

router.post("/create", authenticate, createResult);
router.get("/all", authenticate, getAllResults);
router.get("/:id", authenticate, getResultById);
router.put("/update/:id", authenticate, updateResult);
router.delete("/:id", authenticate, deleteResult);

// Search results by student
router.get("/student/:studentId", authenticate, getResultsByStudent);

// Search results by class
router.get("/class/:classNumber", authenticate, getResultsByClass);


export const ResultRoutes = router;
