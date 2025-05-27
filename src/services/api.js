import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todo-7-2vgq.onrender.com/api', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;