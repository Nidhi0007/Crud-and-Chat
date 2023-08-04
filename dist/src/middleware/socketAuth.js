"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
// middleware for socket 
const jwtAuthMiddleware = (socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secratekey = process.env.SECRET;
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error: Token not provided.'));
        }
        else {
            const decoded = jwt.verify(token, secratekey);
            if (!decoded) {
                return next(new Error('Please Authenticate'));
            }
            socket.decodedToken = decoded;
            return next();
        }
    }
    catch (err) {
        return next(new Error('Please Authenticate'));
    }
});
exports.default = jwtAuthMiddleware;
