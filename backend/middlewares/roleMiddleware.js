export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non authentifié." });
    }

    if (!user.role || typeof user.role !== "string") {
      return res.status(403).json({ message: "Rôle utilisateur invalide." });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Accès refusé : rôle non autorisé." });
    }

    next();
  };
}
