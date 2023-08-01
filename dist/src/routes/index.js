"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const resources_route_1 = __importDefault(require("./resources.route"));
const router = express_1.default.Router();
router.use("/user", user_route_1.default);
router.use("/resources", resources_route_1.default);
module.exports = router;
