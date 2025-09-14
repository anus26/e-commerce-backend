import { v2 as cloudinary } from "cloudinary";

// Cloudinary config ek hi jagah likh do (repeat na karo)
cloudinary.config({
  cloud_name: "dhbtwb02a",
  api_key: "715817427384168",
  api_secret: "l0-HfCwuRLJjh1dLyoeBId07D18",
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // multer ke req.file.path se upload hoga
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "products", // optional folder
    });

    return res.json({
      message: "Image uploaded successfully",
      url: uploadResult.secure_url, // ye database me save karna hota hai
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed", error });
  }
};

export { uploadImage };

