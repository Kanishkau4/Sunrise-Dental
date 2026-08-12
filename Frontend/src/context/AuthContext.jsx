import { createContext, useContext, useState } from 'react';
import { login as loginApi } from '../api/authApi';

/**
 * React Context lets us share "who is logged in" state across the entire app without
 * manually passing it down through every component's props (called "prop drilling").
 * Any component can call useAuth() to read the current user or trigger login/logout.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize from localStorage so a page refresh doesn't log the user out.
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (username, password) => {
    const data = await loginApi(username, password); // { token, username, fullName, role }
    const userInfo = { username: data.username, fullName: data.fullName, role: data.role };

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);

    return userInfo;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook so components just call useAuth() instead of useContext(AuthContext).
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
