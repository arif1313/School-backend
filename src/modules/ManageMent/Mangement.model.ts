import { Schema, model, Model } from "mongoose";
import { IManagement } from "./Mangement.interface";


const ManagementSchema = new Schema<IManagement>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    managementId: { type: String, unique: true },
    designation: { type: String, required: true },
    joinDate: { type: Date },
    address: { type: String },
    role: { type: String, default: "management" },
  },
  { timestamps: true }
);


// Auto-generate managementId and joinDate
ManagementSchema.pre("save", function (next) {
  if (!this.managementId) {
    const uniquePart = Date.now().toString().slice(-4);
    this.managementId = `MNG${new Date().getFullYear()}${uniquePart}`;
  }
  if (!this.joinDate) {
    this.joinDate = new Date();
  }
  next();
});

export const ManagementModel: Model<IManagement> = model<IManagement>("Management", ManagementSchema);
