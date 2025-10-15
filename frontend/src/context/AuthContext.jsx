import { createContext, useContext, useEffect, useState } from "react";
import { get, post } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // === Chargement automatique de l'utilisateur via le cookie JWT ===
  useEffect(() => {
    (async () => {
      try {
        const data = await get("/users/me");
        setUser(data.user || null);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur :", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // === Inscription ===
  async function register(payload) {
    const data = await post("/users/register", payload);
    return data;
  }

  // === Connexion ===
  async function login(payload) {
    const data = await post("/users/login", payload);
    try {
      const me = await get("/users/me");
      setUser(me.user || null);
    } catch (error) {
      console.error("Erreur lors du chargement de /users/me après login :", error);
    }
    return data;
  }

  // === Déconnexion ===
  async function logout() {
    try {
      await post("/users/logout");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    } finally {
      setUser(null);
    }
  }

  // === Détection du rôle admin (selon la structure du backend) ===
  const isAdmin =
    user?.roles === "admin" ||
    user?.role === "admin" ||
    user?.is_admin === true;

  // === Debug (à supprimer une fois validé) ===
  console.log("Utilisateur connecté :", user);
  console.log("isAdmin =", isAdmin);

  // === Valeur globale du contexte ===
  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAdmin,
  };

  // === Loader pendant le chargement initial ===
  if (loading) {
    return (
      <div className="text-center text-[#FFD700] py-10">
        Chargement...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// === Hook personnalisé ===
export function useAuth() {
  return useContext(AuthContext);
}

