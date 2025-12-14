import express from "express"
import { sendmessage } from "../Controllers/Message.controlles.js"
import authmiddleware from "../middleware/User.middleware.js"

const routermessage=express.Router()
routermessage.post("/send/:id",authmiddleware,sendmessage)

export default routermessage