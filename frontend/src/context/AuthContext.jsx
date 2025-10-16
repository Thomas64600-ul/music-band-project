import { createContext, useContext, useEffect, useState } from "react";
import { get, post } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user || null);
      } catch (error) {
        console.error("Erreur lors du chargement de /users/me :", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  
  async function register(payload) {
    const data = await post("/users/register", payload);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      setUser(data.user || null);
    }
    return data;
  }

  
  async function login(payload) {
    try {
      const data = await post("/users/login", payload);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user || null);
      }

      return data;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  }

 
  async function logout() {
    try {
      await post("/users/logout");
    } catch (error) {
      console.error("⚠️ Erreur lors de la déconnexion :", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  }

  
  const isAdmin =
    user?.roles === "admin" ||
    user?.role === "admin" ||
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
      <div className="text-center text-[#FFD700] py-10">Chargement...</div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  return useContext(AuthContext);
}


