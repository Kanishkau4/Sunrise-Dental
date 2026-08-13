import api from './client';

// POST /api/appointments - Register New Appointment
export const registerAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};

// GET /api/appointments/{appointmentNumber} - Display Appointment Details
export const getAppointmentByNumber = async (appointmentNumber) => {
  const response = await api.get(`/appointments/${appointmentNumber}`);
  return response.data;
};

// GET /api/appointments - list all (for the dashboard/reports view)
export const getAllAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

// GET /api/appointments/search?q= - Search Appointments
export const searchAppointments = async (query) => {
  const response = await api.get('/appointments/search', { params: { q: query } });
  return response.data;
};

// GET /api/appointments/{appointmentNumber}/bill - Calculate and Print Bill
export const getBill = async (appointmentNumber) => {
  const response = await api.get(`/appointments/${appointmentNumber}/bill`);
  return response.data;
};