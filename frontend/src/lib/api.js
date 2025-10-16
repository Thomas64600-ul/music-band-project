import axios from "axios";


export const API_BASE_URL = "https://music-band-project.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response && error.response.status === 401) {
      console.warn("🔒 Token expiré ou invalide. Redirection vers /login...");
      localStorage.removeItem("token");

     
      if (typeof window !== "undefined") {
      
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);


export const get = (url, config = {}) => api.get(url, config).then((r) => r.data);
export const post = (url, data, config = {}) => api.post(url, data, config).then((r) => r.data);
export const put = (url, data, config = {}) => api.put(url, data, config).then((r) => r.data);
export const del = (url, config = {}) => api.delete(url, config).then((r) => r.data);

export default api;

