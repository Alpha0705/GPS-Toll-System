// src/Navbar.jsx
import React, { useState } from 'react';
import { LogOut, User, Home, Wallet, FileText, Compass } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ handleLogout }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const location = useLocation();

  const navItems = [
    { icon: <Home />, label: 'Dashboard', link: '/dashboard' },
    { icon: <User />, label: 'Profile', link: '/profile' },
    { icon: <Wallet />, label: 'Wallet', link: '/wallet' },
    { icon: <FileText />, label: 'Billing History', link: '/billing-history' },
    { icon: <Compass />, label: 'Location History', link: '/location-history' },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-[60px] bg-gray-800 text-emerald-500 bg-opacity-50 flex flex-col justify-between items-center py-4">
      <div className="flex flex-col justify-center items-center h-full space-y-10">
        {navItems.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className={`relative group ${location.pathname === item.link ? 'text-red-500' : ''}`}
            onMouseEnter={() => setHoveredIcon(index)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="flex justify-center items-center">
              {item.icon}
            </div>
            <AnimatePresence>
              {hoveredIcon === index && (
                <motion.span
                  className="absolute left-[70px] bg-gray-800 text-white px-2 py-1 rounded-md shadow-lg whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </div>
      <div
        className="relative group cursor-pointer"
        onClick={handleLogout}
        onMouseEnter={() => setHoveredIcon('logout')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <LogOut />
        {hoveredIcon === 'logout' && (
          <motion.span
            className="absolute left-[70px] bg-gray-800 text-white px-2 py-1 rounded-md shadow-lg whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            Logout
          </motion.span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
