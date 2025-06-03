import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // अपने backend URL से बदलें अगर ज़रूरत हो
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // login के बाद token localStorage में save होना चाहिए
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
