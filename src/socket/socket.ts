import { io } from "../../index"
import messageModel from "../models/message.model"
import roomModel from "../models/room.model"
const users = []
export default (socket: any) => {
    console.log("New connection")

    socket.on("joinChat", async (room: string) => {
        let user = { room, socket }
        let data = {
            name: room,
            user: socket.decodedToken.id
        }
        const findRoom = await roomModel.findOne({
            name: room
        })
        if (!findRoom) {
            const roomSave = new roomModel(data)
            await roomSave.save()

        } else {
            users.push(user)
            socket.join(room)

            let message = {
                message: `${socket.decodedToken.username} has joined the room`,
                roomId: findRoom._id,
                user: socket.decodedToken.id
            }
            const messageres = new messageModel(message)
            await messageres.save()
            io.to(room).emit("message", ` ${socket.decodedToken.username} has joined the room`)
        }


    })

    socket.on("roomMessage", async (newMessage: string, room: string) => {
        const findRoom = await roomModel.findOne({
            name: room
        })!
        let message = {
            message: newMessage,
            roomId: findRoom?.id,
            user: socket.decodedToken.id
        }
        const messageres = new messageModel(message)
        await messageres.save()
        io.to(room).emit("message", `${socket.decodedToken.username}:${newMessage}`)
    })

}