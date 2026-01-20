import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dcpacusxh",
  api_key: process.env.CLOUDINARY_API_KEY || "397881516666721",
  api_secret: process.env.CLOUDINARY_API_SECRET || "nZ4qxqZnmAt0ghYkpHZsgpCRv5Q",
});

export default cloudinary;
