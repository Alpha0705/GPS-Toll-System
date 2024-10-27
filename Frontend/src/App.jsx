import React, { useEffect } from "react";
import FloatingShape from "./components/FloatingShape.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { useAuthStore } from "./Store/AuthStore.js";
import LocationHistory from "./pages/locationHistory.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ErrorBoundary from "./ErrorHandling/ErrorBoundary.jsx";

import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Profile from "./pages/Profile.jsx";
import Wallet from "./pages/Wallet.jsx";
import Billing from "./pages/Billing.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import ContactUs from "./pages/ContactUsPage.jsx";

// Protect Authenticated route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verifyemail" replace />;
  }

  return children;
};

// Redirect authenticated user to dashboard
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) return <LoadingSpinner/>

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<RedirectAuthenticatedUser><HomePage /></RedirectAuthenticatedUser>} />
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
          <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
          <Route path="/verifyemail" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage/></RedirectAuthenticatedUser>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/billing-history" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
          <Route path="/location-history" element={<ProtectedRoute><LocationHistory /></ProtectedRoute>} />
          <Route path="/contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route path='/reset-password/:token'element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>}/>
          {/* catch all routes */}
				  <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </ErrorBoundary>

      <Toaster />
    </div>
  );
}

export default App;
