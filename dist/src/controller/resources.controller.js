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
const __1 = require("../..");
const addResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const cacheKey = `pagination:${page}`;
        const data = req.body;
        const resource = new resources_model_1.default(data);
        const saveResource = yield resource.save();
        if (saveResource) {
            yield __1.redisClient.del(cacheKey);
        }
        return res.json({ message: "Resource successfully Created", resource: saveResource });
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
});
const getResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = Number(req.query.page) ? Number(req.query.page) : 1;
        const cacheKey = `pagination:${page}`;
        let findResources = [];
        let limit = 5;
        let cacheData = yield __1.redisClient.get(cacheKey);
        if (cacheData) {
            const parsedData = JSON.parse(cacheData);
            findResources = parsedData;
        }
        else {
            findResources = yield resources_model_1.default.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            __1.redisClient.set(cacheKey, JSON.stringify(findResources));
        }
        const count = yield resources_model_1.default.count();
        return res.send({
            resources: findResources,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
});
const updateResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const cacheKey = `pagination:${page}`;
        const id = req.params.id;
        const data = req.body;
        yield resources_model_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, data));
        yield __1.redisClient.del(cacheKey);
        return res.send({ message: "Resource successfully updated" });
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
});
const removeResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield resources_model_1.default.deleteOne({ _id: id });
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
