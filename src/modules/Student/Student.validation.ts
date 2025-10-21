import Joi from "joi";

// 🔹 Create Student Validation Schema
export const studentCreateValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),

  phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow("", null).messages({
    "string.pattern.base": "Phone must contain only digits (10–15)",
  }),

  contact: Joi.string().allow("", null),

  studentId: Joi.string().allow("", null),

  class: Joi.number().integer().min(1).max(10).required().messages({
    "number.base": "Class must be a number",
    "number.min": "Class must be at least 1",
    "number.max": "Class cannot be greater than 10",
    "any.required": "Class is required",
  }),

  rollNumber: Joi.number().integer().required().messages({
    "number.base": "Roll number must be a number",
    "any.required": "Roll number is required",
  }),

  section: Joi.string().allow("", null),

  admissionYear: Joi.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear())
    .allow(null),

  admissionDate: Joi.date().allow(null),

  guardianName: Joi.string().allow("", null),

  guardianPhone: Joi.string().pattern(/^[0-9]{10,15}$/).allow("", null).messages({
    "string.pattern.base": "Guardian phone must contain only digits (10–15)",
  }),

  address: Joi.string().allow("", null),

  role: Joi.string().valid("student").default("student"),
});


// 🔹 Update Student Validation Schema
export const studentUpdateValidationSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Name cannot be empty",
  }),

  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email",
  }),

  password: Joi.string().min(6).messages({
    "string.min": "Password must be at least 6 characters long",
  }),

  phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow("", null).messages({
    "string.pattern.base": "Phone must contain only digits (10–15)",
  }),

  contact: Joi.string().allow("", null),

  studentId: Joi.string().allow("", null),

  class: Joi.number().integer().min(1).max(10).messages({
    "number.base": "Class must be a number",
    "number.min": "Class must be at least 1",
    "number.max": "Class cannot be greater than 10",
  }),

  rollNumber: Joi.number().integer().messages({
    "number.base": "Roll number must be a number",
  }),

  section: Joi.string().allow("", null),

  admissionYear: Joi.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear())
    .allow(null),

  admissionDate: Joi.date().allow(null),

  guardianName: Joi.string().allow("", null),

  guardianPhone: Joi.string().pattern(/^[0-9]{10,15}$/).allow("", null).messages({
    "string.pattern.base": "Guardian phone must contain only digits (10–15)",
  }),

  address: Joi.string().allow("", null),

  role: Joi.string().valid("student").default("student"),
})
.min(1)
.messages({
  "object.min": "At least one field must be provided for update",
});
