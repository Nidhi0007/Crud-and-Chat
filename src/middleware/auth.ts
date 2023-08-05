import { NextFunction, Response, Request } from "express";
var jwt = require("jsonwebtoken");

// auth middleware for protected apis
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secratekey: string = process.env.SECRET as string;
    const token: string | undefined = req.header("Authorization");
    if (!token) {
      res.status(401).send("Please Authenticate");
    } else {
      const tokenArray = token.split(" ");
      const decoded = jwt.verify(tokenArray[1], secratekey);
      if (!decoded) {
        res.status(401).send("Please Authenticate");
      }

      next();
    }
  } catch (err: any) {
    res.status(401).send("Please Authenticate");
  }
};

export default auth;
