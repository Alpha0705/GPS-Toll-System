// src/Layout.jsx
import React from 'react';
import Navbar from './Navbar'; // Adjust the path if necessary

const Layout = ({ children }) => {
    const handleLogout = () => {
        console.log('Logout function here'); // Implement your logout logic here
    };

    return (
        <div className="flex">
            <Navbar handleLogout={handleLogout} />
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;