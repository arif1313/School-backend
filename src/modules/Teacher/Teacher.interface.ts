export interface ITeacher {
  // 🔹 Basic Info
  name: string;
  email: string;
  password: string;
  phone?: string;

  // 🔹 Academic Info
  teacherId: string;           // auto-generated (e.g., TCH20251007xxxx)
  subject: string;             // main subject they teach
  classesAssigned: number[];   // classes they teach (e.g., [8, 9, 10])
  joinDate: Date;              // auto current date

  // 🔹 Optional Personal Info
  address?: string;
  qualification?: string;
  experience?: string;         // e.g., "5 years"
  role: "teacher";

  // 🔹 Meta
  createdAt?: Date;
  updatedAt?: Date;
}
