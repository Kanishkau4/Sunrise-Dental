import api from './client';

// POST /api/users - Create a new staff account (ADMIN only, enforced by backend)
export const createUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};

// GET /api/users - List all staff accounts (ADMIN only)
export const getAllUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};