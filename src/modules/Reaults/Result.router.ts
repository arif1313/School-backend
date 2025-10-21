import express from "express";
import {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
} from "./Result.controller";
import { authenticate } from "../../Middelware/auth";

const router = express.Router();

router.post("/create", authenticate, createResult);
router.get("/all", authenticate, getAllResults);
router.get("/:id", authenticate, getResultById);
router.put("/update/:id", authenticate, updateResult);
router.delete("/:id", authenticate, deleteResult);

export const ResultRoutes = router;
