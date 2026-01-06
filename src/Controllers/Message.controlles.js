
import Chat from "../models/Chat.modles.js"
import Message from "../models/Message.models.js"
import { io,  onlineUsers, setupSocket} from "../../Scoket.js";

const sendmessage = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;
           let chat = await Chat.findOne({
    participants: { $all: [senderId,  receiverId] },
    });
       if (!chat) {
      chat = await Chat.create({
        participants: [senderId,  receiverId],
      });
    }
        console.log("Params:", req.params);
        console.log("Body:", req.body);

        
    // save message in DB
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

      if (newMessage) {
      chat.messages.push(newMessage._id);
    }

    // 🔥 REAL-TIME EMIT (CORRECT)
      await Promise.all([chat.save(), newMessage.save()]);

const populatedMessage = await Message.findById(newMessage._id).lean();


   const receiver = onlineUsers[receiverId];
    if (receiver?.online && Array.isArray(receiver.socket)) {
      receiver.socket.forEach((socketId) => {
        io.to(socketId).emit("newMessage", populatedMessage);
      });
    }

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




const getmessage=async(req,res)=>{
    try {
        const chatuserId=req.params.id
        const senderId=req.user._id
      let  chat=await Chat.findOne({
        participants:{$all:[senderId,chatuserId]},
      })
.populate({
  path: "messages",
  options: { sort: { createdAt: 1 } } // oldest → newest
})

       if(!chat){
     return res.status(200).json({messages:[]})
    }
    const messages=chat.messages
        return res.status(200).json({message:"get messages",messages})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    }
}
export {sendmessage,getmessage}