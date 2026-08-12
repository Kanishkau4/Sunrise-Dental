import axios from 'axios';

/**
 * A single, shared Axios instance for the whole app. Every API call goes through this,
 * so we configure auth handling and error handling in ONE place instead of repeating it
 * in every component.
 *
 * baseURL is empty because Vite's dev proxy (see vite.config.js) forwards "/api/..."
 * requests to the Spring Boot backend automatically.
 */
const api = axios.create({
  baseURL: '/api',
});

// REQUEST INTERCEPTOR: runs before every single request leaves the browser.
// We read the JWT we saved in localStorage after login, and attach it as an
// "Authorization: Bearer <token>" header - exactly what our Spring Boot JwtAuthFilter
// expects to see.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR: runs after every response comes back. If the backend says 401
// (Unauthorized) - meaning our token is missing, expired, or invalid - we clear the
// stored session and send the user back to login, instead of leaving them stuck on a
// broken page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
