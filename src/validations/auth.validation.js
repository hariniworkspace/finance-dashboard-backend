const Joi = require("joi");


const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "analyst", "viewer").optional()
});



const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
    }),

  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};