let Joi = require('joi')

const resourceSchema = {
    body: Joi.object().keys({
        name: Joi.string().email().required(),
        description: Joi.string()
    })
}
export default {
    resourceSchema
}