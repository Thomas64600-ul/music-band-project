import Joi from "joi";


export const createDonationSchema = Joi.object({
  user_id: Joi.number().integer().allow(null), 
  amount: Joi.number().positive().required(),
  message: Joi.string().max(250).allow(null, ""),
});


export const updateDonationSchema = Joi.object({
  amount: Joi.number().positive().optional(),
  message: Joi.string().max(250).allow(null, "").optional(),
});
