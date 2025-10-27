import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { logoutUser } from '../redux/slices/authSlice';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, role } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'Profile', icon: '👤', path: '/profile' },
    { name: 'Interviews', icon: '🎯', path: '/interviews' },
    { name: 'Analytics', icon: '📈', path: '/analytics' },
  ];

  const managerItems = [
    { name: 'Groups', icon: '👥', path: '/groups' },
    { name: 'Schedules', icon: '📅', path: '/schedules' },
    { name: 'Reports', icon: '📋', path: '/reports' },
  ];

  const adminItems = [
    { name: 'Users', icon: '👥', path: '/admin/users' },
    { name: 'Managers', icon: '👨‍💼', path: '/admin/managers' },
    { name: 'System', icon: '⚙️', path: '/admin/system' },
  ];

  const getSidebarItems = () => {
    if (role === 'admin') return [...sidebarItems, ...managerItems, ...adminItems];
    if (role === 'manager') return [...sidebarItems, ...managerItems];
    return sidebarItems;
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <img 
                src="https://codegnan.com/wp-content/uploads/2025/04/cropped-Codegnan-Destination-New-Logo-e1745992388557.png" 
                alt="Codegnan Logo" 
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{display: 'none'}} className="text-3xl">🎯</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              Welcome, <span className="font-medium">{user?.name}</span>
              <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                {role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col h-full`}>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              {getSidebarItems().map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500">Powered by Codegnan</p>
              <p className="text-xs text-gray-400 mt-1">© 2025 Framewise Clone</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
