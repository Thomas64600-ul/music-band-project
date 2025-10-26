import { createContext, useContext, useEffect, useState } from "react";
import { get, post } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    (async () => {
      try {
        const res = await get("/users/me");
        setUser(res?.data || null);
      } catch (error) {
        console.warn("⚠️ Aucun utilisateur connecté :", error?.response?.status);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  async function register(payload) {
    try {
      const res = await post("/users/register", payload);
      return res;
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      throw error;
    }
  }

  
  async function login(payload) {
    try {
      const res = await post("/users/login", payload);
      if (res.success) {
       
        const me = await get("/users/me");
        setUser(me?.data || null);
      }
      return res;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  }


  async function logout() {
    try {
      await post("/users/logout");
    } catch (e) {
      console.warn("Erreur de déconnexion :", e);
    } finally {
      setUser(null);
    }
  }


  const isAdmin =
    user?.role === "admin" ||
    user?.roles === "admin" ||
    user?.is_admin === true;

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAdmin,
  };

 
  if (loading) {
    return (
      <div className="text-center text-[var(--accent)] py-10 animate-pulse">
        Chargement de la session utilisateur...
      </div>
    );
  }


  return (
    <AuthContext.Provider value={value}>
      {children}
      {user && (
        <div className="fixed bottom-3 right-3 text-xs sm:text-sm bg-[var(--accent)] text-white px-3 py-2 rounded-lg shadow-lg opacity-80">
          Connecté : {user.firstname} {user.lastname} ({user.role})
        </div>
      )}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}



