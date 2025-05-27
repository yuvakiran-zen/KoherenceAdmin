import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  RiDashboardLine,
  RiApps2Line, 
  RiCalendarTodoLine, 
  RiListCheck2, 
  RiSettings4Line,
  RiUser3Line,
  RiLogoutBoxRLine
} from 'react-icons/ri';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Get user display name - try user.name first, then user.user_metadata.name if available,
  // then fall back to email username or generic "Admin User"
  const getUserDisplayName = () => {
    if (user?.user_metadata?.name) return user.user_metadata.name;
    if (user?.name) return user.name;
    if (user?.email) return user.email.split('@')[0];
    return 'Admin User';
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      // Navigation is typically handled by the AuthContext's auth state change listener
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Main navigation items
  const navigation = [
    { name: 'Dashboard', href: '/', icon: RiDashboardLine },
    { name: 'Programs', href: '/programs', icon: RiApps2Line },
    { name: 'Routines', href: '/routines', icon: RiCalendarTodoLine },
    { name: 'Steps', href: '/steps', icon: RiListCheck2 },
  ];

  // Settings and support items
  const secondaryNavigation = [
    { name: 'Settings', href: '/settings', icon: RiSettings4Line },
    { name: 'Profile', href: '/profile', icon: RiUser3Line },
  ];

  // Determine if a route is active or parent route is active
  const isRouteActive = (path) => {
    // Exact match
    if (location.pathname === path) return true;
    // Parent route match (for nested routes)
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-200 md:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar for mobile (animated) and desktop (fixed) */}
      <div className="md:relative md:flex">
        {/* Mobile sidebar (with animation) */}
        <motion.aside
          variants={{
            open: { x: 0 },
            closed: { x: -280 },
          }}
          initial="closed"
          animate={sidebarOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg md:hidden flex flex-col overflow-hidden"
        >
          {renderSidebarContent()}
        </motion.aside>
        
        {/* Desktop sidebar (always visible) */}
        <aside className="hidden md:flex md:flex-col md:w-72 bg-white shadow-lg">
          {renderSidebarContent()}
        </aside>
      </div>
    </>
  );

  function renderSidebarContent() {
    return (
      <>
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            Koherence Admin
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 md:hidden"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <div className="px-6 pb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Primary navigation */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 pl-4">Main</div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = isRouteActive(item.href);
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'}`
                  }
                  onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                >
                  <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                  
                  {/* Show dot indicator for active routes */}
                  {isActive && (
                    <span className="ml-auto bg-primary-600 h-2 w-2 rounded-full"></span>
                  )}
                </NavLink>
              );
            })}
          </nav>
          
          {/* Secondary navigation */}
          <div className="mt-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 pl-4">System</div>
            <nav className="space-y-1">
              {secondaryNavigation.map((item) => {
                const isActive = isRouteActive(item.href);
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'}`
                    }
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
              
              <button 
                className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 transition-all mt-4"
                onClick={handleLogout}
              >
                <RiLogoutBoxRLine className="mr-3 h-5 w-5 flex-shrink-0" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t mt-auto">
          <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white mr-3">
                <RiUser3Line className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">{getUserDisplayName()}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@koherence.com'}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Sidebar;