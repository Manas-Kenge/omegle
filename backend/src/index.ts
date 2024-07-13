import express from "express";
import { createServer } from "http";
import { Socket, Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  
});

httpServer.listen(3000);