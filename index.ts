import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import route from './src/routes';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import http from "http"
import jwtAuthMiddleware from './src/middleware/socketAuth';
import socket from './src/socket/socket';
const socketio = require('socket.io');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require("cors");
const redis = require("redis");


dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT;
const url = process.env.URL!;


// redis connection
const redisClient = redis.createClient({
  host: 'localhost', // Replace with your Redis server host
  port: 6379, // Replace with your Redis server port
  // Add any additional configuration options here if needed
});
redisClient.connect();

// Handle Redis connection events
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err:any) => {
  console.error('Error connecting to Redis:', err);
});
export {redisClient};


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/", route)
app.use(cors({
  origin: 'http://localhost:3000/'
}));

mongoose.connect(url)
const httpServer=http.createServer(app)

export const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:3000"
  },
});

io.use((socket, next:any) => {
  jwtAuthMiddleware(socket, next);
});
io.on('connection', socket)
httpServer.listen(port,()=>{
  console.log('Server running!')
})