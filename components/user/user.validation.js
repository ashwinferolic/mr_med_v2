const Joi = require("joi");

const userSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required(),
  role: Joi.string().valid("admin", "customer", "staff"),
  mobileNumber: Joi.string()
    .pattern(new RegExp(/^[7-9][0-9]{9}$/))
    .length(10)
    .required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  address: Joi.object().required().keys({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

module.exports = { userSchema };
