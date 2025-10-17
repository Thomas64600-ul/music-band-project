import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();


const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NODE_ENV } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  const msg = "Cloudinary non configuré correctement : vérifie ton .env (CLOUDINARY_*)";
  if (NODE_ENV === "development") {
    console.warn(msg);
  } else {
    console.error(msg);
  }
}


cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true, 
});


if (NODE_ENV === "development") {
  console.log("Cloudinary configuré :", CLOUDINARY_CLOUD_NAME);
}

export { cloudinary };
export default cloudinary;
