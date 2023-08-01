import express from "express"

import resourceController from "../controller/resources.controller"
import createValidator from "../middleware/validate"
const router = express.Router()

router.post("/add-resource",resourceController.addResource)
router.get("/get-resource",resourceController.getResource)
router.put("/update-resource",resourceController.updateResource)
router.delete("/remove-resource",resourceController.removeResource)

export =router