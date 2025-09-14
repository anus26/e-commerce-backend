import Product from "../models/Pro.models.js"

const productadd=async(req,res)=>{
const {ProductName,Category,Brand,color,Weight,Length,Width,Description,Price,StockQuality,StockQuantity,Discount,Availability}=req.body
try {
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
    Availability

    })
await newproduct.save()
 return   res.status(201).json({message:"Succuessfully Add fiels",newproduct})
    
} catch (error) {
    console.error("Messages error");
    res.status(500).json({message:"Interval server error"})
    
}
}
export {productadd}