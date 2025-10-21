import { ManagementModel } from "./Mangement.model";
import { hashPassword } from "../../Middelware/auth.service";
import { IManagement } from "./Mangement.interface";

export const createManagementService = async (data: IManagement) => {
  const exists = await ManagementModel.findOne({ email: data.email });
  if (exists) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(data.password);

  const management = new ManagementModel({
    ...data,
    password: hashedPassword,
  });

  await management.save();
  return management;
};

export const updateManagementService = async (id: string, data: Partial<IManagement>) => {
  if (data.password) data.password = await hashPassword(data.password);

  const updated = await ManagementModel.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Management not found");
  return updated;
};

export const getAllManagementsService = async () => {
  return await ManagementModel.find();
};

export const getManagementByIdService = async (id: string) => {
  const management = await ManagementModel.findById(id);
  if (!management) throw new Error("Management not found");
  return management;
};

export const deleteManagementService = async (id: string) => {
  const deleted = await ManagementModel.findByIdAndDelete(id);
  if (!deleted) throw new Error("Management not found");
  return deleted;
};
