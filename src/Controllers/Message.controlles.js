import { promises } from "nodemailer/lib/xoauth2"
import Chat from "../models/Chat.modles"
import Message from "../models/Message.models"

const sendmessage=async(req,res)=>{
    try {
        const {message}=req.body
        const {id:receivedId}=req.params
        const senderId=req.user._id
        let chat=await Chat.findone({
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
            chat.message.push(newMessage._id)
            
        }
        await Promise.all([chat.save(),newMessage.save()])
    } catch (error) {
        
    }
}