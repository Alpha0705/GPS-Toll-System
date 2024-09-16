import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Modal from 'react-modal';
import RoutingMachine from 'react-leaflet-routing-machine';
import Navbar from '../components/Navbar.jsx';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Fix marker icons for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startPoint, setStartPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [routePoints, setRoutePoints] = useState([]);
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

  const addVehicle = () => {
    navigate('/add-vehicle');
  };

  const geocodePlace = async (placeName) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${placeName}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lat), parseFloat(lon)];
      } else {
        console.error(`No results found for ${placeName}`);
        return null;
      }
    } catch (error) {
      console.error(`Geocoding error: ${error}`);
      return null;
    }
  };

  const handleRouteSubmit = async () => {
    if (startPoint && destination) {
      const startCoords = await geocodePlace(startPoint);
      const destCoords = await geocodePlace(destination);
      if (startCoords && destCoords) {
        setRoutePoints([startCoords, destCoords]);
      } else {
        alert('Invalid start or destination point');
        setRoutePoints([]); // Clear route points if there's an error
      }
    } else {
      alert('Please enter both start and destination points');
    }
  };

  return (
    <div className="flex flex-col h-screen w-5/6 bg-gray-50 bg-opacity-50">
      {/* Navbar */}
      <Navbar handleLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex flex-1 mt-4 mx-4 mb-4 p-4 rounded-lg overflow-hidden shadow-md bg-white">
        {/* Left side with route input */}
        <div className="w-1/3 p-4 bg-gray-100 flex flex-col rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              onClick={addVehicle}
            >
              +Add Vehicle
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-200 rounded-lg flex-grow shadow-lg">
            <h3 className="text-lg font-bold mb-2">Enter Route</h3>
            <input
              type="text"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              placeholder="Start point (place name)"
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination (place name)"
              className="border p-2 rounded w-full mb-4"
            />
            <button
              onClick={handleRouteSubmit}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full"
            >
              Set Route
            </button>
          </div>
        </div>

        {/* Right side with map */}
        <div className="flex-grow ml-4 rounded-lg overflow-hidden shadow-md">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="h-full w-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {routePoints.length > 0 && (
              <>
                <Marker position={routePoints[0]}>
                  <Popup>Start Point</Popup>
                </Marker>
                <Marker position={routePoints[1]}>
                  <Popup>Destination</Popup>
                </Marker>
                <RoutingMachine
                  waypoints={routePoints.map(point => L.latLng(point[0], point[1]))}
                  routeWhileDragging={true}
                />
              </>
            )}
          </MapContainer>
        </div>
      </div>

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
