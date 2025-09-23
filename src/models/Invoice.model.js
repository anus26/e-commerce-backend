import mongoose, { Schema } from "mongoose";
import Product from "./Pro.models.js";

const InvoiceSchema=new mongoose.Schema({
    InvoiceNumber:{
        type:Number,
        required:true
    },
    CustomerName:{
        type:String,
        required:true
    },
    CustomerAddress:{
        type:String,
        required:true
    },
    PaymentCondition:{
        type:String,
        required:true
    },
    Currency:{
        type:String,
        required:true
    },
    IssueDate:{
        type:String,
        required:true
    },
    DueDate:{
        type:String,
        required:true
    },
    Additionalinfo:{
        type:String,
        required:true
    },
    Products:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", // 👈 relation with Product model
                required: true,
            },
            ProductName:{
                type:String,
                required:true
            },
                    Price:{
            type:Number,
            required:true
        },
        StockQuantity:{
            type:Number,
            required:true
        },
        Discount:{
            type:Number,
           
        },
        },
        ]
    

},{timestamps:true})
 const Invoice =mongoose.model("invoice",InvoiceSchema)
 export default  Invoice