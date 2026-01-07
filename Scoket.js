
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
    transports: [ "websocket"],
  });

  io.on("connection", (socket) => {
  
    

        liveVisitors++;
        io.emit("liveVisitors", liveVisitors);
    
        const userId =
          socket.handshake.auth?.userId ||
          socket.handshake.query?.userId;
       
         
            
        
        
            
        
          if (userId) {
         onlineUsers[socket.id]=data.userId

      onlineUsers[userId].online=true
      onlineUsers[userId].socket.push(socket.id)
      io.emit("onlineUsers",Object.values(onlineUsers))
          }
    
 
      
     
 socket.on("disconnect", () => {
  liveVisitors = Math.max(0, liveVisitors - 1)
  io.emit("liveVisitors", liveVisitors)

  // if (userId && onlineUsers[userId]) {
  //   onlineUsers[userId].socket =
  //     onlineUsers[userId].socket.filter(id => id !== socket.id)

    
  //   // if (onlineUsers[userId].socket.length === 0) {
  //   //   onlineUsers[userId].online = false
  //   // }

  //   io.emit("onlineUsers", onlineUsers)
  // }

  const userId=onlineUsers[socket.id]
  if(userId){
    delete onlineUsers[socket.id]
          io.emit('update online users', Object.values(onlineUsers));
  }
})

  });

  return io;
};
export {io,onlineUsers,setupSocket}
