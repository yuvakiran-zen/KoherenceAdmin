import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiNotification3Line, RiUser3Line, RiMenuLine, RiCloseLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Menu button & Search */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 focus:outline-none md:hidden"
            >
              {sidebarOpen ? (
                <RiCloseLine className="h-6 w-6" />
              ) : (
                <RiMenuLine className="h-6 w-6" />
              )}
            </button>
            
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-800">Welcome to Koherence Admin</h1>
            </div>
          </div>

          {/* Right side - Notifications & Profile */}
          <div className="flex items-center space-x-4">
            <button className="p-1.5 text-gray-500 rounded-full hover:bg-gray-100">
              <RiNotification3Line className="h-5 w-5" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white">
                  <RiUser3Line className="h-5 w-5" />
                </div>
                <span className="hidden md:inline-block font-medium text-sm text-gray-700">
                  {user?.email ? user.email.split('@')[0] : 'Admin User'}
                </span>
              </button>

              {/* Dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;