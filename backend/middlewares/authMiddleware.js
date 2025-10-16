import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


export function protect(req, res, next) {
  try {
    
    let token = req.cookies?.token;

   
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    
    if (!token) {
      return res.status(401).json({ message: "Non authentifié, token manquant" });
    }

   
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

   
    if (process.env.NODE_ENV === "development") {
      console.log("Utilisateur authentifié :", decoded);
    }

    next();
  } catch (error) {
    console.error("Erreur authMiddleware:", error.message);
    const msg =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Token invalide ou expiré";
    return res.status(401).json({ message: msg });
  }
}

