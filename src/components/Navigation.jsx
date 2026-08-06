import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, User } from 'lucide-react';

export function Navigation() {
  const navItems = [
    { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-gray-200/80 shadow-lg px-6 py-2 max-w-md mx-auto sm:max-w-lg md:max-w-xl">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-primary font-semibold scale-105'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-6 h-6 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-0.5 animate-pulse"></span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;
