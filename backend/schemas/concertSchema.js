import Joi from "joi";

export const concertSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  location: Joi.string().min(3).max(100).required(),
  date: Joi.date().iso().required(),
  ticket_url: Joi.string().uri().optional().allow(null, ""),
});
