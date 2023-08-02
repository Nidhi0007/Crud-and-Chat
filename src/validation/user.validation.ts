let Joi = require('joi')

const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).alphanum().required(),
    username: Joi.string().required(),
})
const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).alphanum().required(),

})
export default { userSchema, loginSchema }
