import { NextFunction ,Response,Request} from "express";
var jwt = require('jsonwebtoken');
// middleware for socket 
const jwtAuthMiddleware = async (socket:any, next: NextFunction) => {
    try {
      const secratekey: string = process.env.SECRET as string;
      const token: string | undefined = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error: Token not provided.'));
      } else {
        const decoded = jwt.verify(token, secratekey);
        if (!decoded) {
            return next(new Error('Please Authenticate'));
        }
        socket.decodedToken = decoded;
        return next();
      }
    } catch (err: any) {
        return next(new Error('Please Authenticate'));
    }
  };

  export default jwtAuthMiddleware;