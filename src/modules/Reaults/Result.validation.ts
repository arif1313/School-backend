import Joi from "joi";

// Create validation (all required)
export const resultCreateValidationSchema = Joi.object({
  student: Joi.string().required(),
  examType: Joi.string().valid("1st Term", "Half Yearly", "Final").required(),
  year: Joi.number().required(),
  subjects: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        tutorialMark: Joi.number().min(0).max(20).required(),
        writtenMark: Joi.number().min(0).required(),
        mcqMark: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
});

// Update validation (all optional but validated if present)
export const resultUpdateValidationSchema = Joi.object({
  student: Joi.string(),
  examType: Joi.string().valid("1st Term", "Half Yearly", "Final"),
  year: Joi.number(),
  subjects: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      tutorialMark: Joi.number().min(0).max(20).required(),
      writtenMark: Joi.number().min(0).required(),
      mcqMark: Joi.number().min(0).required(),
    })
  ).min(1),
}).min(1) // At least one field must be provided
  .messages({
    "object.min": "At least one field must be provided for update",
  });
