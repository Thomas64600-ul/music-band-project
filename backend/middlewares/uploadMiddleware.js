import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import "../config/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "reveren_uploads/others";
    let resource_type = "auto";
    let allowed_formats = ["jpg", "jpeg", "png", "webp"];
    let transformation = [{ width: 1200, crop: "limit" }];

    if (req.baseUrl.includes("articles")) folder = "reveren_uploads/articles";
    else if (req.baseUrl.includes("concerts")) folder = "reveren_uploads/concerts";
    else if (req.baseUrl.includes("musics")) {
      folder = "reveren_uploads/musics";
      resource_type = "video"; 
      allowed_formats = ["mp3", "wav", "flac"];
      transformation = undefined; 
    }

    return {
      folder,
      resource_type, 
      allowed_formats,
      transformation,
    };
  },
});


const fileFilter = (req, file, cb) => {
  const allowedImage = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const allowedAudio = ["audio/mpeg", "audio/wav", "audio/flac"];

  if (allowedImage.includes(file.mimetype) || allowedAudio.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format non supporté (image ou audio uniquement)."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

export default upload;



