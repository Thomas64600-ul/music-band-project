import { createContext, useContext, useEffect, useState } from "react";
import { get, post } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    (async () => {
      try {
        const data = await get("/users/me");
       
        setUser(data?.data || null);
      } catch (error) {
        console.warn("⚠️ Aucun utilisateur connecté :", error?.response?.status);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

 
  async function register(payload) {
    const data = await post("/users/register", payload);
   
    return data;
  }

  
  async function login(payload) {
    try {
      const data = await post("/users/login", payload);
      
      const me = await get("/users/me");
      setUser(me?.data || null);
      return me?.data;
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
    user?.role === "admin" || user?.roles === "admin" || user?.is_admin === true;

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
      <div className="text-center text-[#FFD700] py-10">
        Chargement de la session...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      {user && (
        <div className="fixed bottom-3 right-3 text-sm bg-[#B3122D] text-white px-4 py-2 rounded-lg shadow-lg">
          Connecté : {user.firstname} {user.lastname} ({user.role})
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}



