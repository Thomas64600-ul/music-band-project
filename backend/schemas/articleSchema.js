import Joi from "joi";


export const createArticleSchema = Joi.object({
  title: Joi.string().min(3).max(150).required(),
  description: Joi.string().allow("", null).optional(),
  content: Joi.string().min(10).required(),

 
  author_id: Joi.alternatives()
    .try(Joi.number().integer(), Joi.string().regex(/^\d+$/))
    .required(),

  
  image: Joi.any().optional(),
});


export const updateArticleSchema = Joi.object({
  title: Joi.string().min(3).max(150).optional(),
  description: Joi.string().allow("", null).optional(),
  content: Joi.string().min(10).optional(),

  author_id: Joi.alternatives()
    .try(Joi.number().integer(), Joi.string().regex(/^\d+$/))
    .optional(),

  image: Joi.any().optional(),
});
