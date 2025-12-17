import http from "http";
import { Server } from "socket.io";


import express from "express";

let liveVisitors = []; // array of userIds



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
    io.on("connection", (socket) => {
      // Get userId from frontend
      const userId = socket.handshake.auth?.userId 
      || socket.handshake.query?.userId;
      socket.join(userId);
        //  userSocketmap(userId)=socket.id
    if (userId && !liveVisitors.includes(userId)) {
      liveVisitors.push(userId);

    }

    console.log(`🟢 User Connected | Online Users:`, liveVisitors);

      socket.on("sendMessage", ({ receiverId, msg }) => {
    io.to(receiverId).emit("newMessage", msg)
  })

    // Send list of online users to all clients
    io.emit("liveVisitors", liveVisitors);

    // Handle disconnect
    socket.on("disconnect", () => {
      liveVisitors = liveVisitors.filter(id => id !== userId);
      console.log(`❌ User Disconnected | Online Users:`, liveVisitors);
      io.emit("liveVisitors", liveVisitors);
    });
  });
};

