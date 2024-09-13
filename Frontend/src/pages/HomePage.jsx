import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-4xl w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h1 className='text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Welcome to Our GPS Toll System
        </h1>
        <p className='text-lg text-gray-300 mb-6 text-center'>
        Discover our GPS-based toll system, designed to streamline your travel experience.<br/>Enjoy seamless and efficient toll payments, making your journeys smoother and more comfortable.
        </p>
        <div className='flex justify-center space-x-4'>
          <Link
            to="/signup"
            className='px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg
            hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
            transition duration-200'
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className='px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg
            hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900
            transition duration-200'
          >
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
