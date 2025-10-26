import { protect } from "./authMiddleware.js";
import { authorizeRoles } from "./roleMiddleware.js";


export function protectAdminRoute(req, res, next) {
  protect(req, res, (err) => {
    if (err) return next(err);

    
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Accès refusé : administrateur requis.",
      });
    }

    next();
  });
}
