import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import confiq from './app/confiq';
import bodyParser from 'body-parser';

import { StudentRoutes } from './modules/Student/Student.router';
import { login } from './Middelware/auth.controller';
import { ManagementRoutes } from './modules/ManageMent/Management.router';
import { TeacherRoutes } from './modules/Teacher/Teacher.router';
 

const app: Application = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Health check
app.get("/", (req, res) => res.send("This is Lily School backend"));

// Auth
app.post("/auth/login", login);

// Student routes
app.use("/students", StudentRoutes);
app.use('/management',ManagementRoutes)
app.use('/teacher',TeacherRoutes) // ✅ Correct mounting



export default app;
