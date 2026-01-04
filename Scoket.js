
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
  
    

        liveVisitors++;
        io.emit("liveVisitors", liveVisitors);
    
        const userId =
          socket.handshake.auth?.userId ||
          socket.handshake.query?.userId;
       
          if (userId) {
       
            onlineUsers[userId] = 
            
            {online:true,
              socketId:socket.id
            }
            
            io.emit("onlineUsers", onlineUsers)
            
          }
    
 
      
     
    socket.on("disconnect", () => {
      // 🔴 LIVE VISITOR
      liveVisitors--;
      io.emit("liveVisitors", liveVisitors);

      // 🔴 USER OFFLINE
      if (userId) {
        
        onlineUsers[userId] = {
          online: false,
          socketId:null
        };
         
        
        io.emit("onlineUsers", onlineUsers);
      }
    });
  });

  return io;
};
export {io,onlineUsers,setupSocket}
