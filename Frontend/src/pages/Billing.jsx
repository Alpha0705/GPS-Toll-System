import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'; // Adjust the path if necessary

const Billing = () => {
  const [tollData, setTollData] = useState(null);
  const [timestamp, setTimestamp] = useState('');

  // Fetch toll data from JSON file
  useEffect(() => {
    const fetchTollData = async () => {
      try {
        const response = await fetch('/tollData/toll.json');
        const data = await response.json();

        // Get a random toll entry
        const randomToll = data[Math.floor(Math.random() * data.length)];
        setTollData(randomToll);

        // Set the current timestamp
        const currentTimestamp = new Date().toLocaleString();
        setTimestamp(currentTimestamp);
      } catch (error) {
        console.error('Error fetching toll data:', error);
      }
    };

    fetchTollData();
  }, []);

  // Function to handle payment
  const handlePayment = () => {
    // Redirect to the Stripe payment link
    window.location.href = 'https://buy.stripe.com/test_8wM16S8xw6nick8cMM';
  };

  return (
    <Layout>
      <div className="flex-col justify-center items-center h-full w-full rounded-full bg-gray-50" style={{marginLeft:'2  0px'}}>
        <div className="w-full max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">Your Toll Charges</h2>
          <div className="flex flex-col md:flex-row">
            
            <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
              <h3 className="text-lg font-medium mb-4">Charge</h3>
              <p className="text-gray-600 text-sm mb-4">Your toll charge</p>
              <div className="flex items-center mt-4">
                {/* You can add any additional elements here */}
              </div>
            </div>
            
            {/* Right section - Order Summary */}
            <div className="flex-1 p-4">
              <h3 className="text-lg font-medium mb-4">Toll Summary</h3>
              <div className="flex justify-between py-2">
                <p>Subtotal</p>
                <p>₹{tollData ? tollData.CarRate_single : '100.00'}</p>
              </div>
              <div className="flex justify-between font-semibold text-lg py-2 border-t mt-4 pt-4">
                <p>Total</p>
                <p>₹{tollData ? tollData.CarRate_single : '100.00'}</p>
              </div>
              <div className="mt-6 space-y-3">
                <button className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800" onClick={handlePayment}>
                  Credit Card Or Debit Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Billing;
