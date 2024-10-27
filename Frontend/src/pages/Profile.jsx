import React, { useState } from 'react';
import Layout from '../components/Layout'; // Adjust the path if necessary

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Track selected vehicle
  const [userInfo, setUserInfo] = useState({
    firstName: 'Neev',
    lastName: 'Shah',
    email: 'alphaarius69@gmail.com',
    phone: '+91 9004633355',
    bio: 'Engineering Student & Cyber Security Ethusiast',
    country: 'India',
    city: 'Mumbai',
    postalCode: '400086',
    Pid: 'AS45645756',
  });

  // Vehicle State Management
  const [vehicles, setVehicles] = useState([]);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    vehicleNumber: '',
    registrationNumber: '',
    vehicleType: '',
    ownerName: '',
    company: '',
    model: '',
  });

  // Handle image upload and display it
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Toggle editing mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Handle new vehicle form changes
  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({
      ...newVehicle,
      [name]: value,
    });
  };

  // Add vehicle to the list (with unique validation)
  const handleAddVehicle = () => {
    if (vehicles.find(v => v.vehicleNumber === newVehicle.vehicleNumber || v.registrationNumber === newVehicle.registrationNumber)) {
      alert('Vehicle number and registration number must be unique.');
      return;
    }
    setVehicles([...vehicles, newVehicle]);
    setNewVehicle({
      vehicleNumber: '',
      registrationNumber: '',
      vehicleType: '',
      ownerName: '',
      company: '',
      model: '',
    });
    setIsAddingVehicle(false);
  };

  // Handle vehicle selection (ensure only one vehicle can be selected)
  const handleVehicleSelect = (vehicleNumber) => {
    setSelectedVehicle(vehicleNumber === selectedVehicle ? null : vehicleNumber);
  };

  return (
    <Layout>
      <div className="flex flex-row justify-center space-x-4 p-8">
        {/* Profile Content */}
        <main className="w-3/5 h-auto p-6 rounded-lg shadow-md bg-white"> {/* Increased width */}
          <h1 className="text-2xl font-semibold">Profile</h1>
          <div className="flex mt-6 space-x-6">
            <div className="w-full bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-white-300">
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w p-6 h-full flex items-center text-gray-500">
                          Upload Image
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
                    <button onClick={toggleEditMode} className="text-blue-500">
                      {isEditing ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>
              </div>
              <hr className="my-4" />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-600">First Name</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={userInfo.firstName}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                        />
                      ) : (
                        <p>{userInfo.firstName}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Name</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={userInfo.lastName}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                        />
                      ) : (
                        <p>{userInfo.lastName}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email address</p>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={userInfo.email}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                        />
                      ) : (
                        <p>{userInfo.email}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={userInfo.phone}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                        />
                      ) : (
                        <p>{userInfo.phone}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bio</p>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={userInfo.bio}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                        />
                      ) : (
                        <p>{userInfo.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Address</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-600">Country</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={userInfo.country}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                        />
                      ) : (
                        <p>{userInfo.country}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">City/State</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={userInfo.city}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                        />
                      ) : (
                        <p>{userInfo.city}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Postal Code</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="postalCode"
                          value={userInfo.postalCode}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                        />
                      ) : (
                        <p>{userInfo.postalCode}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Personal ID</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="PID"
                          value={userInfo.Pid}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                        />
                      ) : (
                        <p>{userInfo.Pid}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <main className="w-3/5 h-auto p-6 rounded-lg shadow-md bg-white"> {/* Increased width */}
          <h1 className="text-2xl font-semibold">Vehicle Information</h1>
          <div className="mt-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Vehicle List</h2>
              {vehicles.length === 0 ? (
                <p className="text-gray-600">No vehicles added yet.</p>
              ) : (
                <ul className="space-y-4">
                  {vehicles.map((vehicle, index) => (
                    <li
                      key={index}
                      onClick={() => handleVehicleSelect(vehicle.vehicleNumber)}
                      className={`p-4 border rounded-lg cursor-pointer ${selectedVehicle === vehicle.vehicleNumber ? 'bg-blue-100' : ''}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{vehicle.vehicleNumber}</h3>
                          <p className="text-gray-600">{vehicle.registrationNumber}</p>
                        </div>
                        {selectedVehicle === vehicle.vehicleNumber && <span className="text-green-500">Selected</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="mt-4 text-blue-500"
                onClick={() => setIsAddingVehicle(!isAddingVehicle)}
              >
                {isAddingVehicle ? 'Cancel' : 'Add New Vehicle'}
              </button>
              {isAddingVehicle && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm">Vehicle Number</label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      value={newVehicle.vehicleNumber}
                      onChange={handleVehicleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Registration Number</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={newVehicle.registrationNumber}
                      onChange={handleVehicleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Vehicle Type</label>
                    <input
                      type="text"
                      name="vehicleType"
                      value={newVehicle.vehicleType}
                      onChange={handleVehicleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Owner Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={newVehicle.ownerName}
                      onChange={handleVehicleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={newVehicle.company}
                      onChange={handleVehicleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={newVehicle.model}
                      onChange={handleVehicleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <button
                    onClick={handleAddVehicle}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Add Vehicle
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;
