import Joi from "joi";

export const createMusicSchema = Joi.object({
  title: Joi.string().min(2).max(150).required(),
  artist: Joi.string().allow("", null).optional(),
  url: Joi.string().uri().required(),
  cover_url: Joi.string().uri().allow("", null).optional(),
});

export const updateMusicSchema = Joi.object({
  title: Joi.string().min(2).max(150).optional(),
  artist: Joi.string().allow("", null).optional(),
  url: Joi.string().uri().optional(),
  cover_url: Joi.string().uri().allow("", null).optional(),
});
