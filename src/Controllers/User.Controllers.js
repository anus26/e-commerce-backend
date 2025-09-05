import createTokensaveCookie from "../../jwt/genreatetoken.js";
import User from "../models/User.models.js"
import bcrypt, { hash }  from "bcryptjs";
import { sendMail } from "../Utils/sendMail.js";
import crypto from "crypto";

const signup=async(req,res)=>{
    const {fullname,email,password,confirmpassword}=req.body
   try {
    if (password!==confirmpassword) {
       return res.status(400).json({error:"password not match"})
        
    }
    const users=await User.findOne({email})
    if (users) {
        return  res.status(400).json({error:"email already exist"})
    }
    const hashpassword=await bcrypt.hash(password,10)
    const user=new User({
          fullname,
          email,
          password:hashpassword,
      
    })
     await user.save()
      if (user) {
        createTokensaveCookie(res,user._id)
          res.status(201).json({message:"user singnup successfully",user:{
              _id:user._id,
            fullname:user.fullname,
            email:user.email
          }})
      }
        
    
   
   } catch (error) {
     console.log(error);
        res.status(500).json({error:"internal server error"})
   }

}


const signin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})

        if (!user) {
            return res.status(400).json({error:"user not match"})
            
        }
        const isMatch=await  bcrypt.compare(password,user.password)
     if (!user || isMatch) {
return res.status(400).json({error:"invalid email or password"})
        
     }
     createTokensaveCookie(res,user.id)

      res.status(200).json({message:"user login successfully",user:{
    _id:user._id,
fullname:user.fullname,
email:user.email
}})
    } catch (error) {
         console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}


const logout=async(req,res)=>{
    try {
         res.clearCookie("jwt")

        return res.status(200).json({message:"clear cookies successfully"})
    } catch (error) {
             console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

const alluserid=async(req,res)=>{
    try {
        const {id}=req.params
              const user=await User.findById(id)
        if (!user) {
            return res.status(400).json({error:"id not match"})
            
        }
        return res.status(200).json({user})
    } catch (error) {
            console.log(error);
        res.status(500).json({error:"internal server error"}) 
    }
}

const alluser=async(req,res)=>{
    try {
       const loggedInuser=req.user._id
       const user=await User.find({_id:{$ne:loggedInuser},}).select(
        "-password"
           ) 
       return res.status(200).json(user)
    } catch (error) {
         console.log("Error ", error);
    }
}


 const sendMailcon = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Please provide to, subject, and text" });
    }

    await sendMail(to, subject, text);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const forgetpassword=async(req,res)=>{
    const {email}=req.body
    const user=await User.findOne({email})
    if (!user) {
        return res.status(400).json({messages:"email not found"})
    }
    // const resetToken=crypto.randomBytes(32).toString("hex")
//     const hashToken=crypto.createHash("sha256").update(resetToken).digest("hex")
    
//     user.resetPasswordToken=hashToken
//     user.resetPasswordExpire=Date.now()+15*60*1000
//     await user.save()
// const resetUrl = `http://localhost:5000/api/v1/user/reset-password/${resetToken}`;
const otp=generateOTP()
user.otp=otp

user.otpExpire=Date.now()+5*60*1000


await user.save()

        // 5. Send email with reset link
    const subject = "Password Reset OTP";
  const   text= `Your OTP is ${otp}. It will expire in 5 minutes.`

  await sendMail(user.email,subject,text)
  return res.status(200).json({messages:"Password reset email sent successfully"})

}



const resetpassword=async(req,res)=>{
    try {
        const {token}=req.params
        const {password}=req.body
         const hashToken = crypto.createHash("sha256").update(token).digest("hex")
         const user=await User.findOne({
            resetPasswordToken:hashToken,
          resetPasswordExpire: { $gt: Date.now() },
            
        })
        
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Save new password (make sure to hash with bcrypt in your schema pre-save hook)
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
         console.error("Reset Password Error:", error);
    res.status(500).json({ error: "Internal server error" });
    }
}


const verification=async(req,res)=>{
    const {email,otp}=req.body
    const user=await User.findOne({email })
    if (!user) return res.status(400).json({messages:"user not exicts"})
        
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpire<Date.now()) return res.status(400).json({messages:"OTP Expired"})
      

      return res.status(200).json({ message: "OTP verified successfully" });        
    
}

const resetpass=async(req,res)=>{
    const {email,otp,newpassword}=req.body
       const user=await User.findOne({email})
    if (!user) return res.status(400).json({messages:"user not exicts"})
           if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpire < Date.now()) return res.status(400).json({ message: "OTP expired" });
    const hashpassword=await bcrypt.hash(newpassword,10)
  user.password = hashpassword;

    user.otp=null
    user.otpExpire=null
    await user.save()
 
    return res.status(200).json({ message: "Password reset successful ✅" ,newpassword:hashpassword,email});

}
const resendOtp=async(req,res)=>{
  
  await  sendMail(User.email,subject,text)
  return res.status(200).json({message:"New Otp Send Successfully"})
}

const generateOTP=()=>Math.floor(100000 + Math.random()*900000)

export {signup,signin,logout,alluserid,alluser,sendMailcon,forgetpassword,resetpassword,verification,resetpass,resendOtp}

