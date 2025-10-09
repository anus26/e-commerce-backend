import express from "express"
import {createInvoice,  getInvoice } from "../Controllers/Invoice.Controllers.js"

const routerinvoice=express.Router()
routerinvoice.post("/invoice",createInvoice)
routerinvoice.get("/getinvoice",getInvoice)
export default routerinvoice