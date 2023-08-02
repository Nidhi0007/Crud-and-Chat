"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resources_model_1 = __importDefault(require("../models/resources.model"));
const addResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const resource = new resources_model_1.default(data);
        const saveResource = yield resource.save();
        return res.json({ message: "Resource successfully Created", resource: saveResource });
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
});
const getResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findResources = yield resources_model_1.default.find();
        return res.send(findResources);
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
});
const updateResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        yield resources_model_1.default.findOneAndUpdate({ id: id }, Object.assign({}, data));
        return res.send({ message: "Resource successfully updated" });
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
});
const removeResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield resources_model_1.default.deleteOne({ id: id });
        return res.send({ message: "Resource successfully deleted" });
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
});
exports.default = {
    addResource,
    getResource,
    updateResource,
    removeResource,
};
