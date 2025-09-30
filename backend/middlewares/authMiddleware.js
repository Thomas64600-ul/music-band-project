import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function protect(req, res, next) {
  const token = req.cookies.token || "";

  if (!token) {
    return res.status(401).json({ message: "Non authentifié, token manquant" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (error) {
    const msg =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Token invalide ou expiré";
    return res.status(401).json({ message: msg });
  }
}
