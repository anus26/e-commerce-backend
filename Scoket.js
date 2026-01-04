
import { Server} from "socket.io";

const onlineUsers = {};
let liveVisitors = 0;
let io
 const setupSocket = (server) => {
   io = new Server(server, {
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
  console.log("socket",socket);
  
    liveVisitors++;
    io.emit("liveVisitors", liveVisitors);

    const userId =
      socket.handshake.auth?.userId ||
      socket.handshake.query?.userId;


 
    socket.on("setuser", (userId)=> {
 
      onlineUsers[socket.id]=userId

    
      socket.join(userId),
    
      io.emit("onlineUsers",Object.values(onlineUsers))
        
    }
  )
    
    socket.on("disconnect", () => {
      // 🔴 LIVE VISITOR
      liveVisitors--;
      io.emit("liveVisitors", liveVisitors);

      // 🔴 USER OFFLINE
      if (userId) {
      
        delete onlineUsers[socket.id]
    
        io.emit("onlineUsers", Object.values(onlineUsers));
      }
    });
  });

  return io;
};
export {io,onlineUsers,setupSocket}
