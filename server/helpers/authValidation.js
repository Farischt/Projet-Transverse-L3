const Joi = require("@hapi/joi");

// Register Validation :
const registerValidation = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    repeatedPassword: Joi.string().min(6).required(),
  });
  return JoiSchema.validate(data);
};

// Password Validation for the registration
const passwordValidation = (password, repeatedPassword) => {
  if (password != repeatedPassword) return false;
  return true;
};

// Login Validation
const loginValidation = (data) => {
  const JoiSchema = Joi.object({
    email: Joi.string().min(6).required().email(),

    password: Joi.string().min(6).required(),
  });
  return JoiSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.passwordValidation = passwordValidation;
module.exports.loginValidation = loginValidation;
