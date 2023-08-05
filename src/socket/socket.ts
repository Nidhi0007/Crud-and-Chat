import { io } from "../../index";
import messageModel from "../models/message.model";
import roomModel from "../models/room.model";
const users = [];
export default (socket: any) => {
  console.log("New connection");

  // socket to join chat

  socket.on("joinChat", async (room: string) => {
    let user = { room, socket };
    let data = {
      name: room,
    };
    const findRoom = await roomModel.findOne({
      name: room,
    });
    let message: any = {};
    if (!findRoom) {
      const roomSave = new roomModel(data);
      await roomSave.save();
      message.roomId = roomSave._id;
    } else {
      message.roomId = findRoom._id;
    }
    users.push(user);
    socket.join(room);

    message.message = `${socket.decodedToken.username} has joined the room`;
    message.user = socket.decodedToken.id;
    const messageres = new messageModel(message);
    await messageres.save();
    socket
      .to(room)
      .emit("message", ` ${socket.decodedToken.username} has joined the room`);
  });

  // socket to send message
  socket.on("roomMessage", async (newMessage: string, room: string) => {
    const findRoom = await roomModel.findOne({
      name: room,
    })!;
    let message = {
      message: newMessage,
      roomId: findRoom?.id,
      user: socket.decodedToken.id,
    };
    const messageres = new messageModel(message);
    await messageres.save();
    io.to(room).emit(
      "message",
      `${socket.decodedToken.username}:${newMessage}`
    );
  });
};
