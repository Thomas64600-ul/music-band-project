import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import "../config/cloudinary.js"; 


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = req.baseUrl.includes("concerts")
      ? "reveren_uploads/concerts"
      : "reveren_uploads/articles";

    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 1200, crop: "limit" }],
      resource_type: "image",
    };
  },
});


const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format d’image non supporté (jpg, png, webp uniquement)."));
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

export default upload;


