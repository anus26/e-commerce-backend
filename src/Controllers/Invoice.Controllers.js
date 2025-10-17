import Invoice from "../models/Invoice.model.js"


const createInvoice=async(req,res)=>{
  try {
    const {InvoiceNumber, CustomerName, CustomerAddress,PaymentCondition, Currency,IssueDate, DueDate,Additionalinfo,Products,Total,Status}=req.body
    // const {id,ProductName,Price,StockQuantity,Discount}=req.params
    if (!InvoiceNumber) {
  return res.status(400).json({ message: "Invoice Number is required" });
}

if (!CustomerName) {
  return res.status(400).json({ message: "Customer Name is required" });
}

if (!CustomerAddress) {
  return res.status(400).json({ message: "Customer Address is required" });
}

if (!PaymentCondition) {
  return res.status(400).json({ message: "Payment Condition is required" });
}

if (!Currency) {
  return res.status(400).json({ message: "Currency is required" });
}

if (!IssueDate) {
  return res.status(400).json({ message: "Issue Date is required" });
}

if (!DueDate) {
  return res.status(400).json({ message: "Due Date is required" });
}

if (!Additionalinfo) {
  return res.status(400).json({ message: "Additional Info is required" });
}

if (!Products || Products.length === 0) {
  return res.status(400).json({ message: "At least one Product is required" });
}
if (!Total) {
  return res.status(400).json({ message: "Total is required" });
}
if (!Status) {
  return res.status(400).json({ message: "Status is required" });
}



        // const productId=req.Proudct._id
        const invoice=new Invoice({
      
            InvoiceNumber, 
            CustomerName, 
            CustomerAddress,
            PaymentCondition,
            Currency,IssueDate, 
            DueDate,
            Additionalinfo,
            Products,
            Total,
            Status
        })
       const SavedInvoice= await invoice.save()
        return res.status(201).json({message:"Successfully Add Data",invoice:SavedInvoice})
        
  } catch (error) {
        console.error("Messages error");
    res.status(500).json({message:"Interval server error"})
    
  }
}

const getInvoice=async(req,res)=>{
  try {
    const invoice=await Invoice.find()
    return res.status(200).json({message:"Get Invoice Successfully",invoice})
  } catch (error) {
       console.error("error",error.message);
        return res.status(500).json({message:"Internal Server Error"})
  }
}
const oneInvoice=async(req,res)=>{
  try {
    const {_id}=req.params
    if(!_id)return res.status(400).json({messages:"Invoice id is not match"})
    const invoice=await Invoice.findById({_id})
    return res.status(200).json({message:"Get Invoice Successfully",invoice})
  } catch (error) {
       console.error("error",error.message);
        return res.status(500).json({message:"Internal Server Error"})
  }
}


export { createInvoice ,getInvoice,oneInvoice}