import { Server } from "socket.io";

const onlineUsers = {};
let liveVisitors = 0;
let io;

const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://ashamed-shirlene-anusraza123bm-0a1cc794.koyeb.app",
      ],
      credentials: true,
    },
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    // ✅ Live visitors
    liveVisitors++;
    io.emit("liveVisitors", liveVisitors);

    const userId =
      socket.handshake.auth?.userId ||
      socket.handshake.query?.userId;

    // ✅ Track online users
    if (userId) {
      if (!onlineUsers[userId]) {
        onlineUsers[userId] = {
          online: true,
          sockets: [],
        };
      }

      onlineUsers[userId].online = true;
      onlineUsers[userId].sockets.push(socket.id);

      io.emit("onlineUsers", onlineUsers);
    }

    socket.on("disconnect", () => {
      // ✅ Prevent negative count
      liveVisitors = Math.max(0, liveVisitors - 1);
      io.emit("liveVisitors", liveVisitors);

      if (userId && onlineUsers[userId]) {
        // Remove socket ID
        onlineUsers[userId].sockets =
          onlineUsers[userId].sockets.filter(
            (id) => id !== socket.id
          );

        // If no active sockets → offline
        if (onlineUsers[userId].sockets.length === 0) {
          onlineUsers[userId].online = false;
        }

        io.emit("onlineUsers", onlineUsers);
      }
    });
  });

  return io;
};

export { io, onlineUsers, setupSocket };

