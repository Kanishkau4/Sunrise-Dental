import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import StaffLayout from './layouts/StaffLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DashboardPage from './pages/DashboardPage';
import RegisterAppointmentPage from './pages/RegisterAppointmentPage';
import SearchAppointmentPage from './pages/SearchAppointmentPage';
import HelpPage from './pages/HelpPage';
import AddStaffPage from './pages/AddStaffPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={
              <ProtectedRoute>
                <StaffLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/register" element={<RegisterAppointmentPage />} />
            <Route path="/search" element={<SearchAppointmentPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/staff" element={<AddStaffPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;