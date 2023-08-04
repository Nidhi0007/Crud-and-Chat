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
const index_1 = require("../../index");
const message_model_1 = __importDefault(require("../models/message.model"));
const room_model_1 = __importDefault(require("../models/room.model"));
const users = [];
exports.default = (socket) => {
    console.log("New connection");
    socket.on("joinChat", (room) => __awaiter(void 0, void 0, void 0, function* () {
        let user = { room, socket };
        let data = {
            name: room,
            user: socket.decodedToken.id
        };
        const findRoom = yield room_model_1.default.findOne({
            name: room
        });
        if (!findRoom) {
            const roomSave = new room_model_1.default(data);
            yield roomSave.save();
        }
        else {
            users.push(user);
            socket.join(room);
            let message = {
                message: `${socket.decodedToken.username} has joined the room`,
                roomId: findRoom._id,
                user: socket.decodedToken.id
            };
            const messageres = new message_model_1.default(message);
            yield messageres.save();
            socket.emit("message", ` ${socket.decodedToken.username} has joined the room`);
        }
    }));
    socket.on("roomMessage", (newMessage, room) => __awaiter(void 0, void 0, void 0, function* () {
        const findRoom = yield room_model_1.default.findOne({
            name: room
        });
        let message = {
            message: newMessage,
            roomId: findRoom === null || findRoom === void 0 ? void 0 : findRoom.id,
            user: socket.decodedToken.id
        };
        const messageres = new message_model_1.default(message);
        yield messageres.save();
        index_1.io.to(room).emit("message", `${socket.decodedToken.username}:${newMessage}`);
    }));
};
