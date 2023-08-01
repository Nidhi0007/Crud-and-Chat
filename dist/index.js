"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./src/routes");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const url = process.env.URL;
app.use("/", routes_1.route);
mongoose_1.default.connect(url)
    .then(result => app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}))
    .catch(err => console.log(err));
