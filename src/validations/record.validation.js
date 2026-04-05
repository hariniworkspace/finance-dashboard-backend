const Joi = require("joi");

const createRecordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required(),
  note: Joi.string().allow(""),
  date: Joi.date(),
});

const updateRecordSchema = Joi.object({
  amount: Joi.number().positive(),
  type: Joi.string().valid("income", "expense"),
  category: Joi.string(),
  note: Joi.string().allow(""),
  date: Joi.date(),
});

module.exports = {
  createRecordSchema,
  updateRecordSchema,
};