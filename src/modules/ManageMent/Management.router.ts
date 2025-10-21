import express from "express";
import {
  createManagement,
  updateManagement,
  getAllManagements,
  getManagementById,
  deleteManagement,
} from "./Mangement.controller";
import { authenticate } from "../../Middelware/auth";

const router = express.Router();

// No authentication for first management, authenticated after that
router.post("/create",authenticate, createManagement);

// Protected routes
router.put("/update/:id", authenticate, updateManagement);
router.get("/all", authenticate, getAllManagements);
router.get("/:id", authenticate, getManagementById);
router.delete("/:id", authenticate, deleteManagement);

export const ManagementRoutes = router;
