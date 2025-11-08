

let liveVisitors=0
export  const setupSocket=(io)=>{
    io.on("connection",(socket)=>{
        liveVisitors++
     console.log(`🟢 User Connected | Total Visitors: ${liveVisitors}`);

    io.emit('visitorcount',liveVisitors)
    
    socket.on("disconnect",()=>{
     liveVisitors = Math.max(0, liveVisitors - 1);
    console.log(`❌ User Disconnected | Total Visitors: ${liveVisitors}`);
    io.emit("visitorCount", liveVisitors);
  });
    
})

}
