import express from "express"
import { getmonth, monthData, onemonth } from "../Controllers/Monthly.Controllers.js"

const monthrouter=express.Router()

monthrouter.post("/month",monthData)
monthrouter.get("/get",getmonth)
monthrouter.get("/get/:month",onemonth)

export default monthrouter