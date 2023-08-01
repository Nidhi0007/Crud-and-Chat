import { Request, Response, NextFunction } from "express";
let Joi = require('joi')

const createValidator = (schema: object | Array<object>) =>
    (payload:any) => {
        return Joi.validate(payload, schema, {
            abortEarly: false
        })
    }

export default  createValidator