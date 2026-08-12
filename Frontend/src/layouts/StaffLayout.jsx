import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Shared shell for every logged-in staff page: sidebar nav + top bar + whatever
 * page is currently active (rendered via <Outlet />, React Router's placeholder for
 * "put the matched child route here").
 */
export default function StaffLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Brief section 6: "Exit System - Allow users to safely close the application."
  // In a web app, "closing" the app safely means clearing the session and returning
  // to a public page - we can't literally close the browser tab from JS in most
  // browsers (and shouldn't try to - that would be poor UX/an anti-pattern worth
  // noting if you discuss this design choice in your report).
  const handleExit = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/register', label: 'Register Appointment', icon: '📝' },
    { to: '/search', label: 'Search Appointment', icon: '🔍' },
    { to: '/help', label: 'Help', icon: '❓' },
  ];

  return (
    <div className="min-h-screen flex bg-[#FAFAFA]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6">
        <div className="mb-10">
          <h1 className="text-xl font-bold tracking-tight">Sunrise Dental</h1>
          <p className="text-xs text-gray-400 mt-1">Staff Portal</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="px-4 mb-3">
            <p className="text-sm font-semibold">{user?.fullName}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
          <button
            onClick={handleExit}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
          >
            <span>🚪</span>
            Exit System
          </button>
        </div>
      </aside>

      {/* Main content area - the active page renders here */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
