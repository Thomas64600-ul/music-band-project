import Joi from "joi";

export const createCommentSchema = Joi.object({
  target_type: Joi.string()
    .valid("article", "concert", "music")
    .required()
    .messages({
      "any.only": "Le type de contenu doit être 'article', 'concert' ou 'music'.",
      "string.empty": "Le champ type est requis.",
    }),

  target_id: Joi.number().integer().required().messages({
    "number.base": "L'identifiant du contenu doit être un nombre.",
    "any.required": "L'identifiant du contenu est obligatoire.",
  }),

  content: Joi.string().min(2).max(1000).required().messages({
    "string.empty": "Le contenu du commentaire ne peut pas être vide.",
    "string.min": "Le commentaire doit contenir au moins 2 caractères.",
    "string.max": "Le commentaire ne peut pas dépasser 1000 caractères.",
  }),
});

export const updateCommentSchema = Joi.object({
  content: Joi.string().min(2).max(1000).required().messages({
    "string.empty": "Le contenu du commentaire ne peut pas être vide.",
    "string.min": "Le commentaire doit contenir au moins 2 caractères.",
    "string.max": "Le commentaire ne peut pas dépasser 1000 caractères.",
  }),
});
