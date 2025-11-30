import mongoose  from "mongoose";


const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
       required:true
    },
       lastname:{
        type:String,
       required:true
    },
       position:{
        type:String,
       required:true
    },
       Telephone:{
        type:Number,
       required:true
    },
       Country:{
        type:String,
       required:true
    },
       City:{
        type:String,
       required:true
    },
       Postcode:{
        type:Number,
       required:true
    },

    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
      imageUrl:{
    type:String
  },

    name:String,
    email:{type:String,required:true,unique:true},
    password:String,
    
    otp:String,
    otpExpire:Date,


  resetPasswordToken: String,
  resetPasswordExpire: Date
},{timestamps:true})
const User  =mongoose.model("user",userSchema)
export default User