import { Types } from "mongoose";

export interface IResult {
  student: Types.ObjectId;      
  examType: "1st Term" | "Half Yearly" | "Final";
  year: number;

  subjects: {
    name: string;
    tutorialMark: number;       
    writtenMark: number;        
    mcqMark: number;            
    totalMark: number;          
  }[];

  totalMarks: number;
  average: number;
  grade: string;

  createdAt?: Date;
  updatedAt?: Date;
}
