const Joi = require("@hapi/joi")

module.exports.createCouponValidation = (data) => {
  const JoiSchema = Joi.object({
    title: Joi.string().min(5).max(18).uppercase().required(),
    expiry: Joi.date().required(),
    discount: Joi.number().min(5).max(95).required(),
  })
  return JoiSchema.validate(data)
}
