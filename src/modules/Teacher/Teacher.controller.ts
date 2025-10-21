import { Request, Response } from 'express';
import { TeacherModel } from './Teacher.model';
import { hashPassword } from '../../Middelware/auth.service';

export const createTeacher = async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'management') return res.status(403).json({ message: 'Forbidden' });

    const { name, email, password, phone, subject, classesAssigned } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email & password required' });

    const exists = await TeacherModel.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await hashPassword(password);

    const teacher = new TeacherModel({
      ...req.body,
      password: hashedPassword,
    });
    await teacher.save();

    res.status(201).json({ message: 'Teacher created', teacherId: teacher.teacherId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
