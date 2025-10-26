import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function protect(req, res, next) {
  try {
    let token = null;

    
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Accès refusé : aucun token fourni.",
      });
    }

    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    
    if (process.env.NODE_ENV !== "production") {
      console.log("Utilisateur authentifié :", decoded);
    }

    next();
  } catch (error) {
    console.error("Erreur protect middleware :", error.message);

    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expirée. Veuillez vous reconnecter.",
      });
    }

    return res.status(401).json({
  success: false,
  message: "Session expirée. Merci de vous reconnecter.",
});
  }
}


