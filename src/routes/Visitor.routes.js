import express  from "express";
import { getvisit, visitor } from "../Controllers/Visitor.Controllers.js";

const visitorroutes=express.Router()
visitorroutes.post("/visit",visitor)
visitorroutes.get("/getvisit",getvisit)
export default visitorroutes