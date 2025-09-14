import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    ProductName:{
        type:String,
        required:true
        },
        Category:{
            type:String,
            required:true
        },
        Brand:{
            type:String,
            required:true
        },
        color:{
            type:String,
            required:true
        },
        Weight:{
            type:Number,
            required:true
        },
        Length:{
            type:Number,
            required:true
        },
        Width:{
            type:Number,
            required:true
        },
        Description:{
            type:String,
            required:true
        },
        Price:{
            type:Number,
            required:true
        },
        StockQuantity:{
            type:String,
            required:true
        },
        Discount:{
            type:String,
            required:true
        },
        StockQuality:{
            type:String,
            required:true
        },
        Availability:{
            type:String,
            required:true
        },
        // images:{
        //     type:Image,
        //     required:true
        // }
},{timestamps:true})
const Product=mongoose.model("product",productSchema)
export default Product