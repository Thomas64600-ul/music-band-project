import Joi from "joi";


export const registerSchema = Joi.object({
  firstname: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Le prénom est requis.",
    "string.min": "Le prénom doit contenir au moins 2 caractères.",
    "string.max": "Le prénom ne peut pas dépasser 50 caractères.",
  }),

  lastname: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Le nom est requis.",
    "string.min": "Le nom doit contenir au moins 2 caractères.",
    "string.max": "Le nom ne peut pas dépasser 50 caractères.",
  }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "L'adresse e-mail doit être valide.",
      "string.empty": "L'adresse e-mail est obligatoire.",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.",
      "string.empty": "Le mot de passe est obligatoire.",
    }),

  role: Joi.string().valid("user", "admin").default("user"),

  
  image_url: Joi.string().uri().optional().allow(null, ""),


  is_verified: Joi.boolean().default(false),
});


export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Adresse e-mail invalide.",
      "string.empty": "L'adresse e-mail est obligatoire.",
    }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères.",
    "string.empty": "Le mot de passe est obligatoire.",
  }),
});


export const updateUserSchema = Joi.object({
  firstname: Joi.string().trim().min(2).max(50).optional(),
  lastname: Joi.string().trim().min(2).max(50).optional(),
  email: Joi.string().trim().lowercase().email({ tlds: { allow: false } }).optional(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.",
    }),
  role: Joi.string().valid("user", "admin").optional(),
  image_url: Joi.string().uri().optional().allow(null, ""),
  is_verified: Joi.boolean().optional(),
});


export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "L'adresse e-mail doit être valide.",
      "string.empty": "L'adresse e-mail est obligatoire.",
    }),
});


export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.",
      "string.empty": "Le mot de passe est obligatoire.",
    }),
});

