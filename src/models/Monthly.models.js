import mongoose from "mongoose";
import Coustmer from "./Coustmer.models.js";


const monthly=new mongoose.Schema({
    // Coustmer:{
    // type :mongoose.Schema.Types.ObjectId,
    // ref: "Coustmer",
    // required:true
    // },
    month:{
        type :String,
        required:true
    },
    Revenu:{
        type:String,
        required:true
    },
    sale:{
        type :Number,
        required:true
    }
},{timestamps:true})
const Monthlymodel=mongoose.model("monthly",monthly)
export default Monthlymodel