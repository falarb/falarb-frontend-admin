import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    Content: 'application/json'
  }
})

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('tokenAdminSolicitaAi')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default api;