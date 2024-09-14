import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '../components/Navbar.jsx'; // Import the Navbar component

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle logout modal confirmation
  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    // Perform logout logic here
    setIsModalOpen(false);
    navigate('/login'); // Redirect to login after logout
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <Navbar handleLogout={handleLogout} />

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelLogout}
        contentLabel="Logout Confirmation"
        className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-[300px] mx-auto my-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to logout?</h2>
        <div className="flex justify-around">
          <button
            className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600"
            onClick={confirmLogout}
          >
            Yes
          </button>
          <button
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={cancelLogout}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
