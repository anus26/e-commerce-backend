import express from "express"
import { productadd } from "../Controllers/Pro.Controllers.js"
const Productrouter=express.Router()


Productrouter.post("/product",productadd)
export default Productrouter