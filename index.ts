import express, { Express } from "express";
import dotenv from "dotenv";
import route from "./src/routes";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import jwtAuthMiddleware from "./src/middleware/socketAuth";
import socket from "./src/socket/socket";
import { NextFunction } from "./src/interface/socket.interface";
const bodyparser = require("body-parser");
const cors = require("cors");
const redis = require("redis");

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/", route);
app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);
const port = process.env.PORT;
const url = process.env.URL!;

// redis connection
const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
redisClient.connect();

// Handle Redis connection events
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err: Error) => {
  console.error("Error connecting to Redis:", err);
});
export { redisClient };
// redis connection end

// mongodb connection
mongoose.connect(url);
const httpServer = http.createServer(app);

//  socket connection
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use((socket, next: NextFunction) => {
  jwtAuthMiddleware(socket, next);
});
io.on("connection", socket);
httpServer.listen(port, () => {
  console.log("Server running!");
});
