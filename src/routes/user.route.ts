import express from "express"

import userController from "../controller/user.controller"
import user from "../validation/user.validation"
import validate from "../middleware/validate"
const router = express.Router()

router.post("/signup", validate(user.userSchema), userController.signup)
router.post("/login",validate(user.loginSchema), userController.login)

export = router