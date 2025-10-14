import Joi from "joi";


export const registerSchema = Joi.object({
  firstname: Joi.string().min(2).max(50).required(),
  lastname: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.",
    }),
  role: Joi.string().valid("user", "admin").default("user"),
});


export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


export const updateUserSchema = Joi.object({
  firstname: Joi.string().min(2).max(50).optional(),
  lastname: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid("user", "admin").optional(),
});


export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});


export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.",
    }),
});
