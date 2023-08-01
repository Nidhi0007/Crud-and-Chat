"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const resources_controller_1 = __importDefault(require("../controller/resources.controller"));
const router = express_1.default.Router();
router.post("/add-resource", resources_controller_1.default.addResource);
router.get("/get-resource", resources_controller_1.default.getResource);
router.put("/update-resource", resources_controller_1.default.updateResource);
router.delete("/remove-resource", resources_controller_1.default.removeResource);
module.exports = router;
