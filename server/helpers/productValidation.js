const Joi = require("@hapi/joi");

module.exports.createProductValidation = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().max(24).required(),
    description: Joi.string().max(100).required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
  });
  return JoiSchema.validate(data);
};
