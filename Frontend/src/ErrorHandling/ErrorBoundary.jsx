// src/components/ErrorBoundary.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <motion.div 
          className="flex flex-col items-center justify-center text-center p-8 mx-auto my-12 border-2 border-red-500 rounded-lg w-11/12 max-w-md bg-red-50"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle size={48} color="#ff4c4c" />
          <h1 className="text-red-600 mt-4 text-2xl font-bold">Something went wrong.</h1>
          <p className="mt-2 text-gray-600">We're sorry for the inconvenience. Please try again later.</p>
        </motion.div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;