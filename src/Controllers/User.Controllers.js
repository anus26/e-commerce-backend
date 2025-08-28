import User from "../modles/User.models.js"

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
    // const hashpassword=await bcrypt.hash(password,10)
    const user=new User({
          fullname,
          email,
          password,
          confirmpassword
    })
   
   } catch (error) {
     console.log(error);
        res.status(500).json({error:"internal server error"})
   }

}

export {signup}

