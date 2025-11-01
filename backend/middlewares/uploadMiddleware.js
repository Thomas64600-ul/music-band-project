import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isAudio = file.mimetype.startsWith("audio/");

  
    let folder = "reveren_uploads/others";
    if (req.baseUrl.includes("concerts")) folder = "reveren_uploads/concerts";
    else if (req.baseUrl.includes("articles")) folder = "reveren_uploads/articles";
    else if (req.baseUrl.includes("musics")) folder = "reveren_uploads/musics";

    if (isImage) {
      return {
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 1200, crop: "limit" }],
        resource_type: "image",
        public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`,
      };
    }

    if (isAudio) {
      return {
        folder,
        allowed_formats: ["mp3", "wav", "ogg", "flac"],
        
        resource_type: "video",
        
        public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
      };
    }

   
    throw new Error(`Type de fichier non pris en charge : ${file.mimetype}`);
  },
});


const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/flac",
  ];

  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error(`Format non supporté : ${file.mimetype}`));
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, 
});

export default upload;





