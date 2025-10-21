export interface IManagement {
  // 🔹 Basic Info
  name: string;
  email: string;
  password: string;
  phone?: string;

  // 🔹 Management Details
  managementId: string;        // auto-generated (e.g., MNG20251007xxxx)
  designation: string;         // e.g., "Principal", "Vice Principal", "Accountant"
  joinDate: Date;              // auto current date

  // 🔹 Optional Info
  address?: string;
  role: "management";

  // 🔹 Meta
  createdAt?: Date;
  updatedAt?: Date;
}
