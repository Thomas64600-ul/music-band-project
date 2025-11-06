import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserById } from "../models/User.js"; 

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function protect(req, res, next) {
  try {
 
    let token =
      req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Accès refusé : aucun token fourni.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    const user = await getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur introuvable ou supprimé.",
      });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("Utilisateur authentifié :", decoded.email);
    }

    next();
  } catch (error) {
    console.error("Erreur protect middleware :", error.message);

    const msg =
      error.name === "TokenExpiredError"
        ? "Session expirée. Veuillez vous reconnecter."
        : "Session invalide. Merci de vous reconnecter.";

    return res.status(401).json({ success: false, message: msg });
  }
}



