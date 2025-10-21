export interface IStudent {
  // 🔹 Basic Information
  name: string;
  email: string;
  password: string;
  phone?: string;
  contact?: string;

  // 🔹 Academic Info
  studentId: string;            // auto-generated
  class: number;                // 1–10
  rollNumber: number;           // unique within class
  section?: string;
  admissionYear: number;        // auto current year
  admissionDate: Date;          // auto current date

  // 🔹 Guardian Info
  guardianName?: string;
  guardianPhone?: string;
  address?: string;

  // 🔹 Role
  role: "student";

  // 🔹 Meta
  createdAt?: Date;
  updatedAt?: Date;
}
