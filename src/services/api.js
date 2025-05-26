import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Remove /api if your routes start with /api
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(response => response, async error => {
  if (error.response?.status === 401) {
    try {
      const response = await axios.get('http://localhost:5000/api/token', {
        withCredentials: true
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return api(error.config);
    } catch (refreshError) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

export default api;