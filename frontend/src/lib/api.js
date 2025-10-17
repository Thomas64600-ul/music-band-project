import axios from "axios";


export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const get = async (url, config = {}) => (await api.get(url, config)).data;
export const post = async (url, data, config = {}) =>
  (await api.post(url, data, config)).data;
export const put = async (url, data, config = {}) =>
  (await api.put(url, data, config)).data;
export const del = async (url, config = {}) =>
  (await api.delete(url, config)).data;

export default api;



