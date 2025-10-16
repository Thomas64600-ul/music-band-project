import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
   
    const folder =
      req.baseUrl.includes("concerts")
        ? "reveren_uploads/concerts"
        : "reveren_uploads/articles";

    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 1200, crop: "limit" }],
    };
  },
});


function fileFilter(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Type de fichier non supporté : seules les images (jpg, jpeg, png, webp) sont autorisées."
      )
    );
  }
}


const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});


export function handleUploadError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Fichier trop volumineux (max 5 Mo).",
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
   
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
}

export default upload;
