import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function protect(req, res, next) {
  let token = null;

  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

 
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Accès refusé : aucun token fourni.",
    });
  }

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);

   
    req.user = decoded;

  
    next();
  } catch (error) {
    console.error("Erreur de vérification du token :", error.message);
    return res.status(401).json({
      success: false,
      message: "Token invalide ou expiré.",
    });
  }
}


