import express from "express"
import { monthData } from "../Controllers/Monthly.Controllers.js"

const monthrouter=express.Router()

monthrouter.post("/month",monthData)

export default monthrouter