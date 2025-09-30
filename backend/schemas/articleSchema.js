import Joi from "joi";

export const articleSchema = Joi.object({
  title: Joi.string().min(3).max(150).required(),
  content: Joi.string().min(10).required(),
  author_id: Joi.number().integer().required(),
});
