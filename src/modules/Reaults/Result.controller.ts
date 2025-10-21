import { Request, Response } from "express";

import { AuthRequest } from "../../Middelware/auth";
import { resultCreateValidationSchema, resultUpdateValidationSchema } from "./Result.validation";
import { createResultService, deleteResultService, getAllResultsService, getResultByIdService, updateResultService } from "./Result.sevice";

export const createResult = async (req: AuthRequest, res: Response) => {
  try {
    const { error, value } = resultCreateValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const result = await createResultService(value);
    res.status(201).json({ message: "Result created successfully", result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllResults = async (_req: Request, res: Response) => {
  try {
    const results = await getAllResultsService();
    res.status(200).json(results);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getResultById = async (req: Request, res: Response) => {
  try {
    const result = await getResultByIdService(req.params.id);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateResult = async (req: AuthRequest, res: Response) => {
  try {
    const { error, value } = resultUpdateValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updated = await updateResultService(req.params.id, value);
    res.status(200).json({ message: "Result updated successfully", updated });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteResult = async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await deleteResultService(req.params.id);
    res.status(200).json({ message: "Result deleted successfully", deleted });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
