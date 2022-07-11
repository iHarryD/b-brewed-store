const Joi = require("@hapi/joi");

function addressJoiValidation(data) {
  const addressSchema = Joi.object({
    contactName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    alternatePhoneNumber: Joi.string(),
    firstLineAddress: Joi.string().required(),
    lastLineAddress: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
  });
  return addressSchema.validate(data);
}

module.exports = addressJoiValidation;
