"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const validate_1 = __importDefault(require("../middleware/validate"));
const user_validation_1 = __importDefault(require("../validation/user.validation"));
const router = express_1.default.Router();
router.post("/signup", (0, validate_1.default)(user_validation_1.default), user_controller_1.default.signup);
router.post("/login", (0, validate_1.default)(user_validation_1.default), user_controller_1.default.login);
module.exports = router;
