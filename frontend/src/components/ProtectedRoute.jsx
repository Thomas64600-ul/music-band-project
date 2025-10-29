import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader"; 

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading)
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center min-h-screen"
      >
        <Loader />
        <span className="sr-only">Vérification de l’accès en cours...</span>
      </div>
    );

  if (!user)
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Connexion requise pour accéder à cette page." }}
      />
    );

  if (requireAdmin && !isAdmin)
    return (
      <Navigate
        to="/"
        replace
        state={{ message: "Accès réservé aux administrateurs." }}
      />
    );

  return children;
}
