import Monthlymodel from "../models/Monthly.models.js"

const monthData=async(req,res)=>{
    const {Coustmer,month,sale}=req.body
    try {
        if (!Coustmer ||!month || !sale) return res.stauts(400).json({message:"All field are required"})
            const newmonth=new Monthlymodel({
        Coustmer,
        month,
        sale
            })
            await newmonth.save()
            return res.status(201).json({message:"Monthly Data Saved Successfully",data:newmonth})
    } catch (error) {
        console.error("error.Messages",error.message);
        return res.status(500).json({message:"Internal server Error"})
        
    }
}

export {monthData}