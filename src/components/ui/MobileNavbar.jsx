import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  RiDashboardLine,
  RiApps2Line, 
  RiCalendarTodoLine, 
  RiListCheck2,
  RiMenuLine
} from 'react-icons/ri';

const MobileNavbar = ({ setSidebarOpen }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: RiDashboardLine },
    { name: 'Programs', href: '/programs', icon: RiApps2Line },
    { name: 'Routines', href: '/routines', icon: RiCalendarTodoLine },
    { name: 'Steps', href: '/steps', icon: RiListCheck2 },
  ];

  const isActive = (path) => {
    if (location.pathname === path) return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t md:hidden">
      <div className="flex items-center justify-around py-2">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center px-3 py-2 text-xs font-medium transition-colors ${active ? 'text-primary-600' : 'text-gray-500'}`}
            >
              <item.icon className={`h-6 w-6 mb-1 ${active ? 'text-primary-600' : 'text-gray-400'}`} />
              <span>{item.name}</span>
              {active && <span className="absolute top-1 rounded-full h-1 w-1 bg-primary-600"></span>}
            </Link>
          );
        })}
        <button
          className="flex flex-col items-center justify-center px-3 py-2 text-xs font-medium text-gray-500"
          onClick={() => setSidebarOpen(true)}
        >
          <RiMenuLine className="h-6 w-6 mb-1 text-gray-400" />
          <span>Menu</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNavbar;