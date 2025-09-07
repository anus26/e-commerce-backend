import express from "express"
import { getmonth, monthData } from "../Controllers/Monthly.Controllers.js"

const monthrouter=express.Router()

monthrouter.post("/month",monthData)
monthrouter.get("/get",getmonth)

export default monthrouter