import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// 🔹 Stores
const onlineUsers = {};      // login users
let liveVisitors = [];        // total live visitors

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // 🔵 LIVE VISITOR
  liveVisitors++;
  io.emit("liveVisitors", liveVisitors);

  const userId =
    socket.handshake.auth?.userId ||
    socket.handshake.query?.userId;

  // 🟢 LOGIN USER
  if (userId) {
    socket.join(userId);

    onlineUsers[userId] = {
      online: true,
      lastSeen: new Date(),
    };

    console.log("🟢 User Online:", userId);
    io.emit("onlineUsers", onlineUsers);
  }

  socket.on("disconnect", () => {
    // 🔴 LIVE VISITOR REMOVE
    liveVisitors--;
    io.emit("liveVisitors", liveVisitors);

    // 🔴 USER OFFLINE
    if (userId) {
      onlineUsers[userId] = {
        online: false,
        lastSeen: new Date(),
      };

      console.log("🔴 User Offline:", userId);
      io.emit("onlineUsers", onlineUsers);
    }
  });
});

export default server;

