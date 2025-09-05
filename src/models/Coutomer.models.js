import mongoose from "mongoose";

const coustomerSchema=new mongoose.Schema({
    Coustmer:{
       type:String,
       required:true 
    },
    Total:{
        type:String,
        required:true
    }
},{timestamps:true})
const Coustmer=mongoose.model("coustomer",coustomerSchema)
export default Coustmer
