import express from "express"
import { getmessage, sendmessage } from "../Controllers/Message.controlles.js"
import authmiddleware from "../middleware/User.middleware.js"

const routermessage=express.Router()
routermessage.post("/send/:receiverId",authmiddleware,sendmessage)
routermessage.get("/getmessage/:id",authmiddleware,getmessage)

export default routermessage