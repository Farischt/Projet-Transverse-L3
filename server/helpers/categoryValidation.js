const Joi = require("@hapi/joi");

// Category creation validation
module.exports.createCategoryValidation = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().min(2).max(24).required(),
  });
  return JoiSchema.validate(data);
};
