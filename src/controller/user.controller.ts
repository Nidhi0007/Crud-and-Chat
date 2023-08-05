import { Request, Response } from "express";
import { IUser } from "../interface/user.interface";
import userModel from "../models/user.model";
import * as bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');


// signup function
const signup = async (req: Request, res: Response) => {
    try {
        const data: IUser = req.body
        const user = new userModel(data)
        user.password = bcrypt.hashSync(data.password, 10)
        const saveUser = await user.save()
        return res.json({ message: "User successfully Created", user: saveUser })
    } catch (error: any) {
        return res.status(401).json(error.message)
    }
}

// login function
const login = async (req: Request, res: Response) => {
    try {
        const findUser = await userModel.findOne({ email: req.body.email })
        if (!findUser || !findUser.comparePassword(req.body.password)) {
            throw new Error('Invalid email or password.')
        }
        let token = jwt.sign({ username: findUser.username, id: findUser._id, email: findUser.email, password: findUser?.password }, process.env.SECRET)
        return res.json({ token: token })

    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }

}
export default { signup, login }