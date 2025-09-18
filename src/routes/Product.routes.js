import express from "express"
import { deleteproduct, oneproduct, product, productadd, updateproduct } from "../Controllers/Pro.Controllers.js"
import upload from "../middleware/upload.js"
import authmiddleware from "../middleware/User.middleware.js"
const Productrouter=express.Router()


Productrouter.post("/product",upload.single("images",5),authmiddleware,productadd)
Productrouter.get("/product",product)
Productrouter.get("/product/:_id",oneproduct)
Productrouter.delete("/product/:_id",deleteproduct)
Productrouter.put("/product/:_id",updateproduct)

export default Productrouter