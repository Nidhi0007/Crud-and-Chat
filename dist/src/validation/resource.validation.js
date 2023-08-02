"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Joi = require('joi');
const resourceSchema = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string()
    })
};
const updateResource = {
    params: Joi.object().keys({
        id: Joi.string(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string()
    })
};
const deleteResources = {
    params: Joi.object().keys({
        id: Joi.string(),
    }),
};
exports.default = {
    resourceSchema,
    updateResource,
    deleteResources
};
