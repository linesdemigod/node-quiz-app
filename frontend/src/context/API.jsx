import axios from "axios";
const URL = import.meta.env.VITE_BASE_URL;

const API = axios.create({
  baseURL: URL,
  // headers: { "Content-type": "application/json; charset=UTF-8" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
