export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Utilisateur non authentifié.",
      });
    }

   
    if (!user.role || typeof user.role !== "string") {
      return res.status(403).json({
        success: false,
        error: "Rôle utilisateur invalide ou manquant.",
      });
    }

   
    if (!allowedRoles.includes(user.role)) {
      console.warn(`Accès refusé : ${user.email || "Inconnu"} (${user.role})`);
      return res.status(403).json({
        success: false,
        error: "Accès refusé : rôle non autorisé.",
      });
    }

    
    next();
  };
}
