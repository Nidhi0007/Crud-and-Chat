"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.redisClient = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./src/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const socketAuth_1 = __importDefault(require("./src/middleware/socketAuth"));
const socket_1 = __importDefault(require("./src/socket/socket"));
const socketio = require('socket.io');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require("cors");
const redis = require("redis");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cors());
const port = process.env.PORT;
const url = process.env.URL;
// redis connection
const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 18499
    }
});
exports.redisClient = redisClient;
redisClient.connect();
// Handle Redis connection events
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/", routes_1.default);
app.use(cors({
    origin: 'http://localhost:3000/'
}));
mongoose_1.default.connect(url);
const httpServer = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    },
});
exports.io.use((socket, next) => {
    (0, socketAuth_1.default)(socket, next);
});
exports.io.on('connection', socket_1.default);
httpServer.listen(port, () => {
    console.log('Server running!');
});
