import Joi from "joi";

export const createMusicSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(150)
    .required()
    .messages({
      "string.empty": "Le titre est requis.",
      "string.min": "Le titre doit contenir au moins 2 caractères.",
      "string.max": "Le titre ne peut pas dépasser 150 caractères.",
      "any.required": "Le champ titre est obligatoire.",
    }),

  artist: Joi.string()
    .allow("", null)
    .optional()
    .messages({
      "string.base": "L’artiste doit être une chaîne de caractères.",
    }),

  url: Joi.string()
    .uri()
    .allow("", null)
    .optional()
    .messages({
      "string.uri": "Le lien audio doit être une URL valide (ex: https://...).",
    }),

  cover_url: Joi.string()
    .uri()
    .allow("", null)
    .optional()
    .messages({
      "string.uri": "L’URL de la pochette doit être valide.",
    }),
});

export const updateMusicSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(150)
    .optional()
    .messages({
      "string.min": "Le titre doit contenir au moins 2 caractères.",
      "string.max": "Le titre ne peut pas dépasser 150 caractères.",
    }),

  artist: Joi.string()
    .allow("", null)
    .optional()
    .messages({
      "string.base": "L’artiste doit être une chaîne de caractères.",
    }),

  url: Joi.string()
    .uri()
    .allow("", null)
    .optional()
    .messages({
      "string.uri": "Le lien audio doit être une URL valide.",
    }),

  cover_url: Joi.string()
    .uri()
    .allow("", null)
    .optional()
    .messages({
      "string.uri": "L’URL de la pochette doit être valide.",
    }),
});
