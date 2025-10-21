import { StudentModel } from "./Student.model";
import { IStudent } from "./Student.Interface";
import { hashPassword } from "../../Middelware/auth.service";

// 🔹 Create a student
export const createStudentService = async (data: IStudent) => {
  const existing = await StudentModel.findOne({ email: data.email });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(data.password);

  const student = new StudentModel({
    ...data,
    password: hashedPassword,
  });

  await student.save();
  return student;
};

// 🔹 Update a student
export const updateStudentService = async (id: string, data: Partial<IStudent>) => {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const updatedStudent = await StudentModel.findByIdAndUpdate(id, data, { new: true });
  if (!updatedStudent) throw new Error("Student not found");

  return updatedStudent;
};

// 🔹 Get all students
export const getAllStudentsService = async () => {
  return await StudentModel.find();
};

// 🔹 Get a single student by ID
export const getStudentByIdService = async (id: string) => {
  const student = await StudentModel.findById(id);
  if (!student) throw new Error("Student not found");
  return student;
};

// 🔹 Delete a student
export const deleteStudentService = async (id: string) => {
  const deleted = await StudentModel.findByIdAndDelete(id);
  if (!deleted) throw new Error("Student not found");
  return deleted;
};
