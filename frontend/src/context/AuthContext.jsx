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
        setUser(data.user || null);
      } catch {
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
    const data = await post("/users/login", payload); 
    
    const me = await get("/users/me");
    setUser(me.user || null);
    return data;
  }

  async function logout() {
    try {
      await post("/users/logout");
    } finally {
      setUser(null);
    }
  }

  const value = { user, loading, login, logout, register, isAdmin: user?.roles === "admin" };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
