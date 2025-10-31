import  mongoose  from "mongoose";

const visitorSchema=new mongoose.Schema({
  ip:String,
  browser:String,
  device:String
},{timestamps:true})

const Visitor=mongoose.model("visitor",visitorSchema)
export default Visitor