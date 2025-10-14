import Joi from "joi";


export const createMessageSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Le nom est requis.",
      "string.min": "Le nom doit contenir au moins 2 caractères.",
      "string.max": "Le nom ne peut pas dépasser 100 caractères.",
      "any.required": "Le champ nom est obligatoire."
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "L'adresse email est requise.",
      "string.email": "L'adresse email doit être valide.",
      "any.required": "Le champ email est obligatoire."
    }),

  message: Joi.string()
    .min(5)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Le message ne peut pas être vide.",
      "string.min": "Le message doit contenir au moins 5 caractères.",
      "string.max": "Le message ne peut pas dépasser 1000 caractères.",
      "any.required": "Le champ message est obligatoire."
    }),
});


export const updateMessageSchema = Joi.object({
  message: Joi.string()
    .min(5)
    .max(1000)
    .optional()
    .messages({
      "string.min": "Le message doit contenir au moins 5 caractères.",
      "string.max": "Le message ne peut pas dépasser 1000 caractères."
    }),
});
