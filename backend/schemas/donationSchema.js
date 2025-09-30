import Joi from "joi";

export const donationSchema = Joi.object({
  user_id: Joi.number().integer().allow(null), 
  amount: Joi.number().positive().required(),
  message: Joi.string().max(250).allow(null, ""),
});
