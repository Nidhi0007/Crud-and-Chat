"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const router = express_1.default.Router();
router.post("/signup", user_controller_1.default.signup);
router.post("/login", user_controller_1.default.login);
module.exports = router;
