import Joi from "joi";


export const createDonationSchema = Joi.object({
  user_id: Joi.number().integer().allow(null), 

  amount: Joi.number().positive().precision(2).required().messages({
    "number.base": "Le montant doit être un nombre.",
    "number.positive": "Le montant doit être positif.",
    "any.required": "Le montant est obligatoire.",
  }),

  message: Joi.string().max(250).allow(null, "").messages({
    "string.max": "Le message ne peut pas dépasser 250 caractères.",
  }),

  
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow(null, "")
    .messages({
      "string.email": "L’adresse e-mail doit être valide.",
    }),

  stripe_session_id: Joi.string().allow(null, ""),
  stripe_payment_intent: Joi.string().allow(null, ""),
  currency: Joi.string().valid("eur", "usd").default("eur"),

  status: Joi.string()
    .valid("pending", "succeeded", "failed")
    .default("pending"),
});


export const updateDonationSchema = Joi.object({
  amount: Joi.number().positive().precision(2).optional().messages({
    "number.base": "Le montant doit être un nombre.",
    "number.positive": "Le montant doit être positif.",
  }),

  message: Joi.string().max(250).allow(null, "").optional(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow(null, "")
    .optional()
    .messages({
      "string.email": "L’adresse e-mail doit être valide.",
    }),

  currency: Joi.string().valid("eur", "usd").optional(),

  status: Joi.string()
    .valid("pending", "succeeded", "failed")
    .optional(),

  stripe_session_id: Joi.string().allow(null, "").optional(),
  stripe_payment_intent: Joi.string().allow(null, "").optional(),
});
