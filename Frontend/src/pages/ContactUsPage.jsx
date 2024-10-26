import React from 'react';
import { motion } from 'framer-motion'; // For animations
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // React Leaflet
import Layout from '../components/Layout'; // Assuming the layout component is already created
import 'leaflet/dist/leaflet.css'; // Leaflet CSS

// New location coordinates
const position = [19.048597754309075, 72.91155090909173];

const ContactUs = () => {
  return (
    <Layout>
      {/* Main Container */}
      <div className="w-full h-screen overflow-auto bg-gray-100">
        {/* About Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="p-10 bg-white text-center"
        >
          <h1 className="text-4xl font-bold mb-6">About SAKEC</h1>
          <p className="text-lg max-w-4xl mx-auto leading-relaxed mb-10">
            Shah And Anchor Kutchhi Engineering College (SAKEC) is one of the leading institutions in India,
            providing quality education in the field of engineering and technology. Established in 1985, SAKEC
            is affiliated with the University of Mumbai and offers various undergraduate and postgraduate
            programs in engineering disciplines.
          </p>
        </motion.div>

        {/* Leaflet Map and Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="p-10 bg-gray-100 flex flex-col md:flex-row justify-between items-center"
        >
          {/* Leaflet Map */}
          <div className="w-full md:w-1/2 h-96">
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  Shah And Anchor Kutchhi Engineering College (SAKEC) <br />
                  <a href="https://www.google.com/maps/place/Shah+%26+Anchor+Kutchhi+Engineering+College/@19.0485116,72.9090082,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c5f39a7d77d1:0x9ebbdeaea9ec24ae!8m2!3d19.0485065!4d72.9115831!16zL20vMGN5eDJq?entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                    View on Google Maps
                  </a>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10 bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  rows="4"
                  placeholder="Your message"
                ></textarea>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ContactUs;
