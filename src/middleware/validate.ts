import { NextFunction, Request, Response } from "express";

const validate = (schema: any) => {
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
