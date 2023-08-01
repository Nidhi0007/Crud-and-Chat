import express from "express"

import userController from "../controller/user.controller"
const router = express.Router()

router.post("/signup",userController.signup)
router.post("/login",userController.login)

export =router