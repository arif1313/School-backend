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


export const ResultRoutes = router;
