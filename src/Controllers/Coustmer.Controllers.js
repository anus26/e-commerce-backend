import Coustmer from "../models/Coustmer.models.js"

const createCoustomer=async(req,res)=>{
    const {field ,Total}=req.body
    try {
        if (!field|| !Total) return res.status(400).json({messages:"Field are required"})
            const newCoustmer=new Coustmer({
           field,
           Total
            })
            await  newCoustmer.save()
            return res.status(200).json({message:"coustmer data save"})
    } catch (error) {
        console.error("error.Messages");
    
    }
}

const getCoustmer=async(req,res)=>{
    try {
        const  {coustomers}=req.params
        const coustomer=await Coustmer.find({coustomers})
    return res.status(200).json({message:"coustmer get all data",coustomer})
    } catch (error) {
        console.error("error.Messages");
        
    }
}


export {createCoustomer,getCoustmer}