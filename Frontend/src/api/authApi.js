import api from './client';

// Calls POST /api/auth/login on the backend. Returns { token, username, fullName, role }.
export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};
