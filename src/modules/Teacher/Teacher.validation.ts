import Joi from "joi";

export const teacherCreateValidationSchema = Joi.object({
  // 🔹 Basic Info
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow("", null).messages({
    "string.pattern.base": "Phone must contain only digits (10–15)",
  }),

  // 🔹 Academic Info
  teacherId: Joi.string().allow("", null),
  subject: Joi.string().required().messages({
    "string.empty": "Subject is required",
  }),
  classesAssigned: Joi.array()
    .items(Joi.number().integer().min(1).max(12))
    .default([])
    .messages({
      "array.base": "Classes must be a list of class numbers (1–12)",
    }),
  joinDate: Joi.date().allow(null),

  // 🔹 Optional Personal Info
  address: Joi.string().allow("", null),
  qualification: Joi.string().allow("", null),
  experience: Joi.string().allow("", null),

  // 🔹 Role
  role: Joi.string().valid("teacher").default("teacher"),
});

export const teacherUpdateValidationSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow("", null),
  subject: Joi.string(),
  classesAssigned: Joi.array().items(Joi.number().integer().min(1).max(12)),
  joinDate: Joi.date().allow(null),
  address: Joi.string().allow("", null),
  qualification: Joi.string().allow("", null),
  experience: Joi.string().allow("", null),
  role: Joi.string().valid("teacher").default("teacher"),
})
.min(1)
.messages({
  "object.min": "At least one field must be provided for update",
});
