import Joi from "joi";

export const createConcertSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  location: Joi.string().min(3).max(100).required(),
  date: Joi.date().iso().required(),
  ticket_url: Joi.string().uri().allow(null, "").optional(),
  image_url: Joi.string().uri().allow(null, "").optional(), 
});

export const updateConcertSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  location: Joi.string().min(3).max(100).optional(),
  date: Joi.date().iso().optional(),
  ticket_url: Joi.string().uri().allow(null, "").optional(),
  image_url: Joi.string().uri().allow(null, "").optional(), 
});


