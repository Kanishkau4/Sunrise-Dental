import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function StaffLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleExit = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <i className="ph ph-house text-lg"></i> },
    { to: '/register', label: 'Register Appointment', icon: <i className="ph ph-note-pencil text-lg"></i> },
    { to: '/search', label: 'Search Appointment', icon: <i className="ph ph-magnifying-glass text-lg"></i> },
    { to: '/help', label: 'Help', icon: <i className="ph ph-question text-lg"></i> },
  ];

  // Only admins see the "Add Staff" link - matches the backend's
  // @PreAuthorize("hasRole('ADMIN')") restriction on /api/users.
  if (user?.role === 'ADMIN') {
    navItems.push({ to: '/staff', label: 'Add Staff', icon: <i className="ph ph-user-plus text-lg"></i> });
  }

  return (
    <div className="min-h-screen flex bg-[#FAFAFA]">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6">
        <div className="mb-10">
          <h1 className="text-xl font-bold tracking-tight"><i className="ph ph-tooth inline-block -rotate-12"></i><Link to="/">Sunrise Dental</Link></h1>
          <p className="text-xs text-gray-400 mt-1">Staff Portal</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${isActive
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
            <i className="ph ph-sign-out text-lg"></i>
            Exit System
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}