import { Request, Response } from "express";
import { IUser } from "../interface/user.interface";
import userModel from "../models/user.model";
import * as bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');
const signup = async (req: Request, res: Response) => {
    try {
        const data: IUser = req.body
        const user = new userModel(data)
        user.password = bcrypt.hashSync(data.password, 10)
        const saveUser = user.save()
        return res.send({ message: "User successfully Created", user: saveUser })
    } catch (error: any) {
        return res.status(401).json(error)
    }
}
const login = async (req: Request, res: Response) => {
    try {
        const findUser = await userModel.findOne({ email: req.body.email })
        if (!findUser || !findUser.comparePassword(req.body.password)) {
            throw new Error('Authentication failed. Invalid email or password.')

        }
        return res.json({ token: jwt.sign({ email: findUser.email, password: findUser?.password }, { secret: process.env.SECRET }) })

    } catch (error: any) {
        return res.status(401).json({ message: error });
    }

}
export default { signup, login }