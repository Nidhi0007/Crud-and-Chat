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
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secratekey = process.env.SECRET;
        const token = req.header("Authorization");
        console.log(token);
        if (!token) {
            res.status(401)
                .send("Please Authenticate");
        }
        else {
            const tokenArray = token.split(" ");
            const decoded = jwt.verify(tokenArray[1], secratekey);
            if (!decoded) {
                res.status(401)
                    .send("Please Authenticate");
            }
            next();
        }
    }
    catch (err) {
        res.status(401)
            .send("Please Authenticate");
    }
});
exports.default = auth;
