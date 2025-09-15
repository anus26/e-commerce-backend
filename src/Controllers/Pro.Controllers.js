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


const product=async(req,res)=>{
    try {
     
        const product=await Product.find()
        return res.status(200).json({message:"get all data",product})
    } catch (error) {
         console.error("error",error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const oneproduct=async(req,res)=>{
    try {
        const {_id}=req.params
         if (!_id) return res.status(400).json({message:" product Id is required"})
            const product=await Product.findById({_id})
         if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

        return res.status(200).json({message:"get one product succuessfully",product})
    } catch (error) {
         console.error("error",error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const deleteproduct=async(req,res)=>{
    try {
        const {_id}=req.params
           if (!_id) return res.status(400).json({message:" product Id is required"})
            const product=await Product.findByIdAndDelete({_id})
              if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
      return res.status(200).json({message:"get one product Delete",product})
    } catch (error) {
               console.error("error",error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const updateproduct=async(req,res)=>{
    try {
        const {_id}=req.params
        const data=req.body
           if (!_id) return res.status(400).json({message:" product Id is required"})
            const product=await Product.findByIdAndUpdate(_id,data,{
        new:true,
        runValidators:true
        
    })
                      if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
      return res.status(200).json({message:"get one product Delete",product})
    } catch (error) {
           console.error("error",error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}
export {productadd,product,oneproduct,deleteproduct,updateproduct}