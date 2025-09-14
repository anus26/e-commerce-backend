import express from "express"
import { productadd } from "../Controllers/Pro.Controllers.js"
import upload from "../middleware/upload.js"
const Productrouter=express.Router()


Productrouter.post("/product",upload.single("images"),productadd)
export default Productrouter