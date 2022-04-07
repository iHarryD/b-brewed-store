const Joi = require("@hapi/joi");

function loginJoiValidation(data) {
  const loginJoiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  return loginJoiSchema.validate(data);
}

function signupJoiValidation(data) {
  const signupJoiSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().allow(""),
    password: Joi.string().min(6).required(),
  });
  return signupJoiSchema.validate(data);
}

module.exports.loginJoiValidation = loginJoiValidation;
module.exports.signupJoiValidation = signupJoiValidation;
