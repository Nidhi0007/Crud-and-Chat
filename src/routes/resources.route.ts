import express from "express"

import resourceController from "../controller/resources.controller"
import validate from "../middleware/validate"
import resource from "../validation/resource.validation"
import auth from "../middleware/auth"
const router = express.Router()

router.post("/add-resource", auth, validate(resource.resourceSchema), resourceController.addResource)
router.get("/get-resource", auth, resourceController.getResource)
router.put("/update-resource/:id", auth, validate(resource.updateResource), resourceController.updateResource)
router.delete("/remove-resource/:id", auth, resourceController.removeResource)

export = router