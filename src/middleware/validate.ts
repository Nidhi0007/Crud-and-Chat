import { NextFunction, Request, Response } from "express";
import Joi from "joi";
interface Schema {
    validate: (data: any) => { error?: Joi.ValidationError };
  }
  
const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(422).send(error.details[0].message);
    } else {
      next();
    }
  };
};

export default validate;
