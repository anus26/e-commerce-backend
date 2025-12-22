
import { Server } from "socket.io";

let onlineUsers = {};
let liveVisitors = 0;

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://ashamed-shirlene-anusraza123bm-0a1cc794.koyeb.app",
      ],
      credentials: true,
    },
    transports: ["polling", "websocket"],
  });

  io.on("connection", (socket) => {
    // 🔵 LIVE VISITOR
    liveVisitors++;
    io.emit("liveVisitors", liveVisitors);

    const userId =
      socket.handshake.auth?.userId ||
      socket.handshake.query?.userId;

    // 🟢 USER ONLINE
    if (userId) {
      onlineUsers[userId] = {
        online: true,
        lastSeen: new Date(),
      };

      socket.join(userId);
      io.emit("onlineUsers", onlineUsers);
    }

    socket.on("disconnect", () => {
      // 🔴 LIVE VISITOR
      liveVisitors--;
      io.emit("liveVisitors", liveVisitors);

      // 🔴 USER OFFLINE
      if (userId) {
        onlineUsers[userId] = {
          online: false,
          lastSeen: new Date(),
        };
        io.emit("onlineUsers", onlineUsers);
      }
    });
  });

  return io;
};
