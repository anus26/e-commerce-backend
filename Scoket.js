import http from "http";
import { Server } from "socket.io";


import express from "express";

let liveVisitors = []; // array of userIds

// {userId={online:true,lastSeen:Date}}


const app = express();
const server = http.createServer(app);
const users={}
export const getReciverSocketId=( receiverId)=>{
  return users[ receiverId]
}

export  const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

export const setupSocket = (io) => {
  const onlineUsers = {};

  io.on("connection", (socket) => {
    const userId =
      socket.handshake.auth?.userId ||
      socket.handshake.query?.userId;

    // 🚫 BLOCK INVALID SOCKET
    if (!userId) {
      console.log("❌ Socket connected without userId — disconnected");
      socket.disconnect(true);
      return;
    }

    socket.join(userId);

    // 🟢 ONLINE
    onlineUsers[userId] = {
      online: true,
      lastSeen: new Date(),
    };

    console.log("🟢 User Connected:", userId);
    console.log("ONLINE USERS:", onlineUsers);

    io.emit("onlineUsers", onlineUsers);

    socket.on("disconnect", () => {
      onlineUsers[userId] = {
        online: false,
        lastSeen: new Date(),
      };

      console.log("❌ User Disconnected:", userId);
      console.log("ONLINE USERS:", onlineUsers);

      io.emit("onlineUsers", onlineUsers);
    });
  });
};


