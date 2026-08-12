import api from './client';

// GET /api/dentists - populates the "choose a dentist" dropdown
export const getDentists = async () => {
  const response = await api.get('/dentists');
  return response.data;
};

// GET /api/treatments - populates the "choose a treatment" dropdown
export const getTreatments = async () => {
  const response = await api.get('/treatments');
  return response.data;
};
