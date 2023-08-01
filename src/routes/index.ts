import express from "express"
import userRoute from "./user.route"
import resourceRoute from "./resources.route"
const router = express.Router()

router.use("/user", userRoute)
router.use("/resources",resourceRoute)

export =router