import Joi from "joi";

export const managementCreateValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),

  phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow("", null).messages({
    "string.pattern.base": "Phone must contain only digits (10–15)",
  }),

  managementId: Joi.string().allow("", null),

  designation: Joi.string().required().messages({
    "string.empty": "Designation is required",
  }),

  joinDate: Joi.date().allow(null),

  address: Joi.string().allow("", null),

  role: Joi.string().valid("management").default("management"),
});


// 🔹 Update Management Validation Schema
export const managementUpdateValidationSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Name cannot be empty",
  }),

  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email",
  }),

  password: Joi.string().min(6).messages({
    "string.min": "Password must be at least 6 characters",
  }),

  phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow("", null).messages({
    "string.pattern.base": "Phone must contain only digits (10–15)",
  }),

  managementId: Joi.string().allow("", null),

  designation: Joi.string().messages({
    "string.empty": "Designation cannot be empty",
  }),

  joinDate: Joi.date().allow(null),

  address: Joi.string().allow("", null),

  role: Joi.string().valid("management").default("management"),
})
.min(1)
.messages({
  "object.min": "At least one field must be provided for update",
});
 