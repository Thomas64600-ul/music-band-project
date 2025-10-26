import axios from "axios";


export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    
    if (import.meta.env.DEV) {
      console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("Session expirée ou non autorisée.");
     
      } else if (status >= 500) {
        console.error("Erreur serveur :", error.response.data);
      }
    } else {
      console.error("Erreur réseau :", error.message);
    }

    return Promise.reject(error);
  }
);




export const get = async (url, config = {}) => {
  const { data } = await api.get(url, { ...config, withCredentials: true });
  return data;
};


export const post = async (url, body, config = {}) => {
  const { data } = await api.post(url, body, { ...config, withCredentials: true });
  return data;
};


export const put = async (url, body, config = {}) => {
  const { data } = await api.put(url, body, { ...config, withCredentials: true });
  return data;
};


export const del = async (url, config = {}) => {
  const { data } = await api.delete(url, { ...config, withCredentials: true });
  return data;
};


export async function createStripeSession({ amount, message, email, user_id }) {
  try {
    const { data } = await api.post("/donations/create-checkout-session", {
      amount,
      message,
      email,
      user_id,
    });

    if (data?.url) {
      window.location.href = data.url;
    } else {
      throw new Error("Aucune URL de paiement reçue.");
    }
  } catch (error) {
    console.error("Erreur Stripe :", error);
    alert("Une erreur est survenue lors de la création du paiement.");
  }
}

export default api;




