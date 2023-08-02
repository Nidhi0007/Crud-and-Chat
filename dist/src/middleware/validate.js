"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Joi = require('joi');
const createValidator = (schema) => (payload) => {
    return Joi.validate(payload, schema, {
        abortEarly: false
    });
};
exports.default = createValidator;
