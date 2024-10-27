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

  // Cancel add vehicle
  const handleCancelAddVehicle = () => {
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

  return (
    <Layout>
      <div className="flex flex-row justify-center space-x-4 p-8">
        {/* Profile Content */}
        <main className="w-13/14 max-w-[800px] h-auto p-6 rounded-lg shadow-md bg-white"> {/* Fixed width */ }
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
                      <p className="text-sm text-gray-600">PID</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="Pid"
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

            {/* Vehicle Management Section */}
            <div className="w-full bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Vehicles</h3>
              <div className="mt-4">
                <button
                  onClick={() => setIsAddingVehicle(true)}
                  className="text-blue-500"
                >
                  Add Vehicle
                </button>
                {isAddingVehicle && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold">Add New Vehicle</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <input
                        type="text"
                        name="vehicleNumber"
                        value={newVehicle.vehicleNumber}
                        onChange={handleVehicleChange}
                        placeholder="Vehicle Number"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        name="registrationNumber"
                        value={newVehicle.registrationNumber}
                        onChange={handleVehicleChange}
                        placeholder="Registration Number"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        name="vehicleType"
                        value={newVehicle.vehicleType}
                        onChange={handleVehicleChange}
                        placeholder="Vehicle Type"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        name="ownerName"
                        value={newVehicle.ownerName}
                        onChange={handleVehicleChange}
                        placeholder="Owner Name"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        name="company"
                        value={newVehicle.company}
                        onChange={handleVehicleChange}
                        placeholder="Company"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        name="model"
                        value={newVehicle.model}
                        onChange={handleVehicleChange}
                        placeholder="Model"
                        className="border p-2 rounded"
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleAddVehicle}
                        className="text-blue-500 mr-4"
                      >
                        Add
                      </button>
                      <button
                        onClick={handleCancelAddVehicle}
                        className="text-red-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                <ul className="mt-4">
                  {vehicles.map((vehicle, index) => (
                    <li
                      key={index}
                      className={`flex justify-between items-center p-2 border-b ${
                        selectedVehicle === vehicle.vehicleNumber ? 'bg-gray-200' : ''
                      }`}
                      onClick={() => handleVehicleSelect(vehicle.vehicleNumber)}
                    >
                      <div>
                        {vehicle.vehicleNumber} - {vehicle.registrationNumber}
                      </div>
                      <button
                        className="text-red-500"
                        onClick={() => {
                          setVehicles(vehicles.filter((v) => v !== vehicle));
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;
