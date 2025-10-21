import { StudentModel } from "../Student/Student.model";
import { IResult } from "./Result.Interface";
import { ResultModel } from "./Result.model";
import { calculateGrade } from "./Result.utils";

export const createResultService = async (data: IResult) => {
  const { subjectResults, totalMarks, average, grade } = calculateGrade(data.subjects);

  const result = new ResultModel({
    ...data,
    subjects: subjectResults,
    totalMarks,
    average,
    grade,
  });

  await result.save();
  return result;
};

export const getAllResultsService = async () => {
  return await ResultModel.find().populate("student");
};

export const getResultByIdService = async (id: string) => {
  const result = await ResultModel.findById(id).populate("student");
  if (!result) throw new Error("Result not found");
  return result;
};

export const updateResultService = async (id: string, data: Partial<IResult>) => {
  const { subjectResults, totalMarks, average, grade } = calculateGrade(data.subjects || []);
  const updated = await ResultModel.findByIdAndUpdate(
    id,
    { ...data, subjects: subjectResults, totalMarks, average, grade },
    { new: true }
  );
  if (!updated) throw new Error("Result not found");
  return updated;
};

export const deleteResultService = async (id: string) => {
  const deleted = await ResultModel.findByIdAndDelete(id);
  if (!deleted) throw new Error("Result not found");
  return deleted;
};


// 1️⃣ Student-wise search
export const getResultsByStudentService = async (studentId: string, year?: number, examType?: string) => {
  const query: any = { student: studentId };
  if (year) query.year = year;
  if (examType) query.examType = examType;

  const results = await ResultModel.find(query).populate("student");
  return results;
};

// 2️⃣ Class-wise search
export const getResultsByClassService = async (classNumber: number, year?: number, examType?: string) => {
  // 1. Find all students in this class
  const students = await StudentModel.find({ class: classNumber }).select("_id");
  const studentIds = students.map((s) => s._id);

  // 2. Find results for these students
  const query: any = { student: { $in: studentIds } };
  if (year) query.year = year;
  if (examType) query.examType = examType;

  const results = await ResultModel.find(query).populate("student");
  return results;
};
