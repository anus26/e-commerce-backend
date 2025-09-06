import express from "express"
import {  createCoustomer, getCoustmer } from "../Controllers/Coustmer.Controllers.js"

const coustrouter=express.Router() 

coustrouter.post("/coustmer",createCoustomer)
coustrouter.get("/get",getCoustmer)

export default coustrouter