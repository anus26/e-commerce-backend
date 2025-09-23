import Invoice from "../models/Invoice.model.js"


const createInvoice=async(req,res)=>{
  try {
    const {InvoiceNumber, CustomerName, CustomerAddress,PaymentCondition, Currency,IssueDate, DueDate,Additionalinfo,Products}=req.body
    // const {id,ProductName,Price,StockQuantity,Discount}=req.params
    if (  !InvoiceNumber ||
      !CustomerName ||
      !CustomerAddress ||
      !PaymentCondition ||
      !Currency ||
      !IssueDate ||
      !DueDate ||
      !Additionalinfo ||
      !Products ||
      Products.length === 0) {
        return res.status(400).json({message:"All Fields are required"})
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
            Products
        })
       const SavedInvoice= await invoice.save()
        return res.status(201).json({message:"Successfully Add Data",invoice:SavedInvoice})
        
  } catch (error) {
        console.error("Messages error");
    res.status(500).json({message:"Interval server error"})
    
  }
}


export default createInvoice