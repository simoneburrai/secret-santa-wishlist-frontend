import axios from "axios";

const apiClient = axios.create({

  baseURL: "https://secret-santa-wishlist-backend.onrender.com", 
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
 
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;