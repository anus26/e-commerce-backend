import express from "express"
import createInvoice from "../Controllers/Invoice.Controllers.js"

const routerinvoice=express.Router()
routerinvoice.post("/invoice",createInvoice)
export default routerinvoice