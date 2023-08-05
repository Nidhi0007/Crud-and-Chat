"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Joi = require('joi');
const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    username: Joi.string().required(),
});
const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
});
exports.default = { userSchema, loginSchema };
