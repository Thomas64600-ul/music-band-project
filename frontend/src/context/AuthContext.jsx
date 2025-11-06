import { createContext, useContext, useEffect, useState } from "react";
import { get, post } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await get("/users/me", { withCredentials: true });
        if (isMounted && res?.data) {
          setUser(res.data);
        } else if (isMounted) {
          setUser(null);
        }
      } catch (err) {
        if (isMounted) {
          console.warn(
            "Session expirée ou non connectée :",
            err?.response?.status || err?.message
          );
          setUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  async function register(payload) {
    try {
      const res = await post("/users/register", payload);
      return res;
    } catch (err) {
      console.error("Erreur d'inscription :", err);
      setError("Erreur lors de l'inscription.");
      throw err;
    }
  }

  async function login(payload) {
    try {
      const res = await post("/users/login", payload, { withCredentials: true });
      if (res.success) {
        const me = await get("/users/me", { withCredentials: true });
        setUser(me?.data || null);
      }
      return res;
    } catch (err) {
      console.error("Erreur de connexion :", err);
      setError("Erreur lors de la connexion.");
      throw err;
    }
  }

  async function logout() {
    try {
      await post("/users/logout", {}, { withCredentials: true });
    } catch (err) {
      console.warn("Erreur de déconnexion :", err);
    } finally {
      setUser(null);
      setError(null);
    }
  }

  const isAdmin =
    user?.role === "admin" ||
    user?.roles === "admin" ||
    user?.is_admin === true;

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAdmin,
  };

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center min-h-screen text-[var(--accent)] animate-pulse"
      >
        Chargement de la session utilisateur…
        <span className="sr-only">Connexion en cours</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}

      {user && (
        <div
          className="
            fixed bottom-3 right-3 px-3 py-2 rounded-lg shadow-lg opacity-80
            bg-[var(--accent)] text-white text-xs sm:text-sm
            focus-within:ring-2 focus-within:ring-[var(--gold)]/50
          "
          aria-live="polite"
        >
          Connecté : {user.firstname} {user.lastname}{" "}
          {user.role && <span className="opacity-90">({user.role})</span>}
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un <AuthProvider>"
    );
  }
  return context;
}



