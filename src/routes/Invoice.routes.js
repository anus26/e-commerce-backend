import express from "express"
import {createInvoice,  getInvoice, oneInvoice } from "../Controllers/Invoice.Controllers.js"

const routerinvoice=express.Router()
routerinvoice.post("/invoice",createInvoice)
routerinvoice.get("/getinvoice",getInvoice)
routerinvoice.get("/oneinvoice/:_id",oneInvoice)
export default routerinvoice