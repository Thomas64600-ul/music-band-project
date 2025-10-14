import Joi from "joi";


export const createConcertSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Le titre du concert est requis.",
      "string.min": "Le titre doit contenir au moins 3 caractères.",
      "string.max": "Le titre ne peut pas dépasser 100 caractères."
    }),

  location: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Le lieu du concert est requis.",
      "string.min": "Le lieu doit contenir au moins 3 caractères.",
      "string.max": "Le lieu ne peut pas dépasser 100 caractères."
    }),

  date: Joi.date()
    .iso()
    .min("now")
    .required()
    .messages({
      "date.base": "La date doit être valide.",
      "date.min": "La date du concert doit être ultérieure à aujourd’hui.",
      "any.required": "La date du concert est requise."
    }),

  ticket_url: Joi.string()
    .uri()
    .allow(null, "")
    .optional()
    .messages({
      "string.uri": "Le lien du billet doit être une URL valide."
    }),
});


export const updateConcertSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  location: Joi.string().min(3).max(100).optional(),
  date: Joi.date().iso().min("now").optional(),
  ticket_url: Joi.string().uri().allow(null, "").optional()
});


