import { Request, Response } from "express";
import { AuthRequest } from "../../Middelware/auth";



import { createManagementService, deleteManagementService, getAllManagementsService, getManagementByIdService, updateManagementService } from "./Management.service";
import { managementCreateValidationSchema, managementUpdateValidationSchema } from "./Management.validation";

// 🔹 Create Management (with first-management bootstrap)
export const createManagement = async (req: AuthRequest, res: Response) => {
  try {
    const { error, value } = managementCreateValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existingManagement = await getAllManagementsService();
    if (!existingManagement.length) {
      // First management → allow creation without authentication
      const management = await createManagementService(value);
      return res.status(201).json({ message: "First management created", managementId: management.managementId });
    }

    // Subsequent management → must be authenticated as management
    if (!req.user || req.user.role !== "management") {
      return res.status(403).json({ message: "Forbidden: Only management can create another management" });
    }

    const management = await createManagementService(value);
    res.status(201).json({ message: "Management created", managementId: management.managementId });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Update management
export const updateManagement = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "management") return res.status(403).json({ message: "Forbidden" });

    const { error, value } = managementUpdateValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updated = await updateManagementService(req.params.id, value);
    res.status(200).json({ message: "Management updated", updated });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// 🔹 Get all managements
export const getAllManagements = async (_req: Request, res: Response) => {
  try {
    const managements = await getAllManagementsService();
    res.status(200).json(managements);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Get single management
export const getManagementById = async (req: Request, res: Response) => {
  try {
    const management = await getManagementByIdService(req.params.id);
    res.status(200).json(management);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// 🔹 Delete management
export const deleteManagement = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "management") return res.status(403).json({ message: "Forbidden" });

    const deleted = await deleteManagementService(req.params.id);
    res.status(200).json({ message: "Management deleted", deleted });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
