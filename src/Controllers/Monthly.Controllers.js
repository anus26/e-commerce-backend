import Monthlymodel from "../models/Monthly.models.js"

const monthData=async(req,res)=>{
    const {month,sale,Revenu}=req.body
    try {
        if (!month || !sale ||  !Revenu) return res.status(400).json({message:"All field are required"})
            const newmonth=new Monthlymodel({
       Revenu,
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

const getmonth=async(req,res)=>{
    const {data}=req.params
    try {
        const months=await Monthlymodel.find({data})
        return res.status(200).json({message:"get month data",months})
    } catch (error) {
        console.error("error",error.message);
        return res.status(500).json({message:"Internal Server Error"})
        
    }
}

export {monthData,getmonth}