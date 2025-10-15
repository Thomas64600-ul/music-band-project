import axios from "axios";


export const API_BASE_URL = "https://music-band-project.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: { "Content-Type": "application/json" },
});


export const get = (url, config={}) => api.get(url, config).then(r => r.data);
export const post = (url, data, config={}) => api.post(url, data, config).then(r => r.data);
export const put = (url, data, config={}) => api.put(url, data, config).then(r => r.data);
export const del = (url, config={}) => api.delete(url, config).then(r => r.data);

export default api;
