import { Server } from "http";


let liveVisitors = []; // array of userIds


const userSocketmap={}


export  const io = new Server(Server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})
export const getRecevierSocketId=(reciverId)=>{
  return userSocketmap[reciverId]
}

 export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    // Get userId from frontend
    const userId = socket.handshake.auth?.userId 
                || socket.handshake.query?.userId;

    if (userId && !liveVisitors.includes(userId)) {
      liveVisitors.push(userId);
    }

    console.log(`🟢 User Connected | Online Users:`, liveVisitors);

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

