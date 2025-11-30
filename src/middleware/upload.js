import multer from "multer";
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
  cloud_name: 'dhbtwb02a',
  api_key: '71581742738416',
  api_secret: 'l0-HfCwuRLJjh1dLyoeBId07D18'
});


const storage =new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"uploads",
        resource_type:"auto"
    }
})
const upload=multer({storage})
export default upload  