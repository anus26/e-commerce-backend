import Product from "../models/Pro.models.js"
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config ek hi jagah likh do (repeat na karo)
cloudinary.config({
  cloud_name: "dhbtwb02a",
  api_key: "715817427384168",
  api_secret: "l0-HfCwuRLJjh1dLyoeBId07D18",
});

const productadd=async(req,res)=>{
    const {ProductName,Category,Brand,color,Weight,Length,Width,Description,Price,StockQuality,StockQuantity,Discount,Availability}=req.body
    
    try {


           if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    folder: "products",
    });
    if (!ProductName ||!Category||!Brand||!color||!Weight||!Length||!Width||!Description||!Price||!StockQuality||!StockQuantity||!Discount||!Availability) return res.status(400).json({message:"All fileds are required"})
        const newproduct  =new  Product({
    ProductName,
    Category,
    Brand,
    color,
    Discount,
    Price,
    StockQuantity,
    StockQuality,
    Length,
    Weight,
    Width,
    Description,
    Availability,
    images:uploadResult.secure_url
    
    })
    
    await newproduct.save()
    
 return   res.status(201).json({message:"Succuessfully Add fiels",newproduct,})
    
} catch (error) {
    console.error("Messages error");
    res.status(500).json({message:"Interval server error"})
    
}
}
export {productadd}