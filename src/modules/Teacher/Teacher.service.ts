import { TeacherModel } from "./Teacher.model";
import { hashPassword } from "../../Middelware/auth.service";
import { ITeacher } from "./Teacher.interface";

export const createTeacherService = async (data: ITeacher) => {
  const exists = await TeacherModel.findOne({ email: data.email });
  if (exists) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(data.password);

  const teacher = new TeacherModel({
    ...data,
    password: hashedPassword,
  });

  await teacher.save();
  return teacher;
};

export const updateTeacherService = async (id: string, data: Partial<ITeacher>) => {
  if (data.password) data.password = await hashPassword(data.password);

  const updated = await TeacherModel.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Teacher not found");
  return updated;
};

export const getAllTeachersService = async () => {
  return await TeacherModel.find().select("-password").lean();
};

export const getTeacherByIdService = async (id: string) => {
  const teacher = await TeacherModel.findById(id).select("-password");
  if (!teacher) throw new Error("Teacher not found");
  return teacher;
};

export const deleteTeacherService = async (id: string) => {
  const deleted = await TeacherModel.findByIdAndDelete(id);
  if (!deleted) throw new Error("Teacher not found");
  return deleted;
};
