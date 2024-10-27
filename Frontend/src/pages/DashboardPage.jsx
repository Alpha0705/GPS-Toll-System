import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Modal from 'react-modal';
import Navbar from '../components/Navbar.jsx';
import 'leaflet/dist/leaflet.css';

// Fix marker icons for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: '', // Remove shadow for default markers
});

// Custom icon for user location (no shadow)
const userLocationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  iconRetinaUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  iconSize: [40, 55], // Adjust the size as needed for better visibility
  iconAnchor: [20, 55], // Adjust anchor point
  popupAnchor: [1, -45], // Position of the popup relative to the icon
  shadowUrl: '', // No shadow for the custom marker
});

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState([20.5937, 78.9629]); // Default to India center
  const [tollPlazaData, setTollPlazaData] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    setIsModalOpen(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }

    // Fetch toll data from the JSON file
    fetch('/tollData/toll.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Get response as text first
      })
      .then((text) => {
        try {
          const jsonData = JSON.parse(text); // Parse the text as JSON
          setTollPlazaData(jsonData.d || []); // Assuming data is inside the "d" property
        } catch (error) {
          console.error('Error parsing JSON:', error, 'Response Text:', text);
          throw new Error('Invalid JSON response');
        }
      })
      .catch((error) => console.error('Error loading toll data:', error));
  }, []);

  return (
    <div className="flex flex-col h-screen w-5/6 bg-gray-50 bg-opacity-50">
      {/* Navbar */}
      <Navbar handleLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex flex-1 mt-4 mx-4 mb-4 p-4 rounded-lg overflow-hidden shadow-md bg-white">
        {/* Right side with map */}
        <div className="flex-grow rounded-lg overflow-hidden shadow-md">
          <MapContainer
            center={userLocation}
            zoom={10}
            className="h-full w-full rounded-lg z-0"
            whenCreated={(map) => map.locate({ setView: true, maxZoom: 16 })}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Add marker for user's current location */}
            <Marker position={userLocation} icon={userLocationIcon}>
              <Popup>Your Location</Popup>
            </Marker>
            {/* Add markers for the toll plazas */}
            {tollPlazaData.map((plaza) => (
              <Marker key={plaza.TollPlazaID} position={[plaza.latitude, plaza.longitude]}>
                <Popup>
                  Location: 
                  <strong>{plaza.TollName || "Unknown Toll Name"}</strong><br />
                  {/* Location: {plaza.Location || "Unknown Location"}<br /> */}
                  {plaza.operator && <b>{plaza.operator}</b>}<br /> {/* Assuming there's an 'operator' field */}
                  Single Car Rate: ₹{plaza.CarRate_single || "N/A"}<br />
                  Distance: {Math.round(L.latLng(userLocation).distanceTo(L.latLng(plaza.latitude, plaza.longitude)))} meters
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={cancelLogout}>
        <h2>Are you sure you want to logout?</h2>
        <button onClick={confirmLogout}>Yes</button>
        <button onClick={cancelLogout}>No</button>
      </Modal>
    </div>
  );
};

export default DashboardPage;
