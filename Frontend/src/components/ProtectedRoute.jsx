import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps any page that should only be visible to logged-in staff (brief: "Only
 * authorized staff can use the system"). If nobody's logged in, it redirects to
 * /login instead of rendering the protected page's content.
 *
 * Usage: <ProtectedRoute><Dashboard /></ProtectedRoute>
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
