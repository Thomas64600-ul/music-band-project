import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: req.baseUrl.includes("concerts")
      ? "reveren_uploads/concerts"
      : "reveren_uploads/articles",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, crop: "limit" }],
  }),
});


const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Format d’image non supporté (jpg, png, webp uniquement)."));
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});


export default upload;



