import Visitor from "../models/Visitor.models.js";

const visitor=async(req,res)=>{
    const ip=req.clientIp
    const browser=req.useragent.browser
    const device=`${req.useragent.browser}-${req.useragent.os}`
    const referrer=req.get('referrer')||'Direct'
    console.log(ip,device,browser);
    const visit=new Visitor({
        ip,
        browser,
        device,
        source:referrer
    })
    await visit.save()
    res.status(200).json({
        message:"succuessfully add visitor",visit
    })


    
}

const getvisit=async(req,res)=>{
    const visit= await Visitor.find()
    res.status(201).json({message:"All visitor data",visit})
}

export {visitor,getvisit}

