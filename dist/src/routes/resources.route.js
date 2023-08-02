"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const resources_controller_1 = __importDefault(require("../controller/resources.controller"));
const validate_1 = __importDefault(require("../middleware/validate"));
const resource_validation_1 = __importDefault(require("../validation/resource.validation"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/add-resource", auth_1.default, (0, validate_1.default)(resource_validation_1.default.resourceSchema), resources_controller_1.default.addResource);
router.get("/get-resource", auth_1.default, resources_controller_1.default.getResource);
router.put("/update-resource/:id", auth_1.default, (0, validate_1.default)(resource_validation_1.default.updateResource), resources_controller_1.default.updateResource);
router.delete("/remove-resource/:id", auth_1.default, resources_controller_1.default.removeResource);
module.exports = router;
