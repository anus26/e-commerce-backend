
import Chat from "../models/Chat.modles.js"
import Message from "../models/Message.models.js"
import { getRecevierSocketId, io } from "../../Scoket.js"

const sendmessage=async(req,res)=>{
    try {
        const {message}=req.body
        const {id:receivedId}=req.params
        const senderId=req.user._id
        let chat=await Chat.findOne({
            participants:{$all:[senderId,receivedId]},
        })
        if (!chat) {
            chat=await Chat.create({
          participants:[senderId,receivedId]
            })

            
        }

        const newMessage=new Message({
            senderId,
            receivedId,
            message
        })
        if (newMessage) {
            chat.messages.push(newMessage._id)
            
        }
        const populateMessage=await Message.findById(newMessage._id).lean()
        const receiverSocketId=getRecevierSocketId(receivedId)
    if (req.io && receiverSocketId) {
    req.io.to(receiverSocketId).emit("newMessage", populateMessage);
}
        await Promise.all([chat.save(),newMessage.save()])
        res.status(201).json(newMessage);
console.log("Sender:", senderId);
console.log("Receiver:", receivedId);
    } catch (error) {
            console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
    }
}
export {sendmessage}