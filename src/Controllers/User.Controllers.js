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
     await user.save()
   
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
     if (user.password!==password) {
return res.status(400).json({error:"password are not match"})
        
     }

        return res.status(200).json({user})
    } catch (error) {
         console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}


const logout=async(req,res)=>{
    try {
        const {email}=req.body
        const user=await User.findOneAndDelete({email})
        return res.status(200).json({user})
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

export {signup,signin,logout,alluserid}

