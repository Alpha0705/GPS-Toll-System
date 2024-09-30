import React, { useState } from 'react';
import { LogOut, User, Home, Wallet, FileText, Compass, MessageCircle } from 'lucide-react'; // Removed Icon
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../Store/AuthStore';  // Adjust the path to where your auth store is located

const Navbar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Access the logout function from the AuthStore
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { icon: <Home />, label: 'Dashboard', link: '/dashboard' },
    { icon: <User />, label: 'Profile', link: '/profile' },
    { icon: <Wallet />, label: 'Wallet', link: '/wallet' },
    { icon: <FileText />, label: 'Billing History', link: '/billing-history' },
    { icon: <Compass />, label: 'Location History', link: '/location-history' },
    { icon: <MessageCircle />, label: 'Contact Us', link: '/contact-us' }, // Contact Us item
  ];

  const confirmLogout = async () => {
    try {
      // Call the logout function from useAuthStore
      await logout();
      // Navigate to the login page after successful logout
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-[60px] bg-gray-800 text-emerald-500 bg-opacity-50 flex flex-col justify-between items-center py-4 z-40">
      {/* Logo at the top */}
      <div className="flex flex-col justify-center items-center mb-6">
        {/* Placeholder for your logo */}
        {/* Add your logo here or remove this div if not needed */}
      </div>

      {/* Navigation Icons */}
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
                  className="absolute left-[70px] bg-gray-800 text-white px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-[1000]" // Increased z-index
                  style={{ pointerEvents: 'none' }} // Prevent hover block
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

      {/* Logout Icon */}
      <div
        className="relative group cursor-pointer"
        onClick={() => setShowLogoutConfirmation(true)}  // Show the confirmation box when clicked
      >
        <LogOut />
      </div>

      {/* Logout Confirmation Box */}
      <AnimatePresence>
        {showLogoutConfirmation && (
          <motion.div 
            className="absolute bottom-20 left-20 bg-gray-700 text-white p-4 rounded-md shadow-lg z-[1000]" // Increased z-index
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <p>Are you sure you want to logout?</p>
            <div className="flex space-x-4 mt-2">
              <button
                className="bg-red-500 px-4 py-2 rounded text-white"
                onClick={confirmLogout}  // If yes, confirm logout
              >
                Yes
              </button>
              <button
                className="bg-gray-500 px-4 py-2 rounded text-white"
                onClick={() => setShowLogoutConfirmation(false)}  // Cancel logout
              >
                No
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
