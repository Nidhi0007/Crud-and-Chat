import express from "express"

import userController from "../controller/user.controller"
import createValidator from "../middleware/validate"
import userSchema from "../validation/user.validation"
const router = express.Router()

router.post("/signup",createValidator(userSchema),userController.signup)
router.post("/login",createValidator(userSchema),userController.login)

export =router