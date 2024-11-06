import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

//realtime message code goes here
export const getReceiverSocketId = (receiverId)=>{
  return users[receiverId];
}

const users={}

// Listen for connection events on the server side
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  const userId = socket.handshake.query.userId
  if(userId){
    users[userId] = socket.id
    console.log("Hello ",users)
  }
  //used to send the events to all connected users
  io.emit("getOnlineUsers", Object.keys(users));

  // Listen for disconnect event from the client and server
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete users[userId]
    io.emit("getOnlineUsers", Object.keys(users))
  });
});

export { app, io, server };
