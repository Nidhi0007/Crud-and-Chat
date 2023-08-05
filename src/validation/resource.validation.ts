let Joi = require("joi");

const resourceSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const updateResource = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string(),
});

export default {
  resourceSchema,
  updateResource,
};
