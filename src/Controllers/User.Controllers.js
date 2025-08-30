import createTokensaveCookie from "../../jwt/genreatetoken.js";
import User from "../models/User.models.js"
import bcrypt  from "bcryptjs";
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

export {signup,signin,logout,alluserid,alluser}

