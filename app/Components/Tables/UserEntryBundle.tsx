import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import BuyCreditModaltrue from '../Modals/WalletBundleModal/BuyCreditModaltrue';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const BundleOptions = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuyBundleModalOpen, setIsBuyBundleModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [amounts, setAmounts] = useState<{ [key: string]: number | string }>({}); // State for amounts by plan ID
  const [smsCounts, setSmsCounts] = useState<{ [key: string]: number }>({}); // State for calculated smscounts

  // Fetch user ID from local storage
  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId ? Number(extractedUserId) : null);
    }
  }, []);

  // Fetch packages from the API
  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/packages`);
      const filteredPlans = response.data.filter((plan: any) => plan.userEntry);
      setPlans(filteredPlans);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Function to handle plan selection and open modal
  const handleChoosePlan = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setAmounts({}); // Reset amounts when closing
    setSmsCounts({}); // Reset smscounts when closing
  };

  const calculateExpiry = (duration: number) => {
    const now = dayjs();
    return now.add(duration, 'day').format('YYYY-MM-DD');
  };

  const buyCreditFromAppWallet = async () => {
    if (!selectedPlan || userId === null || !amounts[selectedPlan.id]) return; // Ensure amount is provided

    const expiryDate = calculateExpiry(selectedPlan.duration);

    const bundleData = {
      userId,
      packageId: selectedPlan.id,
      package_name: selectedPlan.name,
      type: selectedPlan.type,
      expiry: expiryDate,
      status: 'active',
      creditscore: 10,
      smscount: smsCounts[selectedPlan.id] || 0, // Include calculated smscount
    };

    try {
      const response = await axios.post(`${apiUrl}/bundle/createinapp`, bundleData);
      console.log(`Successfully bought ${selectedPlan.name}`, response.data);

      Swal.fire({
        title: 'Purchase Successful!',
        text: `You have successfully purchased the ${selectedPlan.name}.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onClose();
    } catch (error) {
      console.error('Error purchasing bundle:', error);

      Swal.fire({
        title: 'Purchase Failed',
        text: 'There was an error processing your purchase. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Calculate smscount based on entered amount and plan rate
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, plan: any) => {
    const value = Number(e.target.value);
    setAmounts((prev) => ({ ...prev, [plan.id]: value })); // Update the amount for this plan
    setSmsCounts((prev) => ({ ...prev, [plan.id]: value * (plan.rate || 0) })); // Update smscount for this plan
  };

  return (
    <div className="bg-gray-100 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center">Loading plans...</div>
        ) : plans.length === 0 ? (
          <div className="text-center">No plans available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan: any, index: number) => (
              <motion.div
                key={index}
                className={`bg-white rounded-lg p-6 flex flex-col shadow-lg ${plan.popular ? 'border-4 border-blue-500' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-xs font-bold uppercase py-1 px-2 rounded-full self-start mb-4">
                    <FaLightbulb className="inline-block mr-2" />
                    Popular
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">{plan.name}</h3>
                {/* <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-blue-600">Ghc {plan.price}</span>
                  <span className="text-gray-500"> / {plan.duration || plan.period}</span>
                </div> */}
                <p className="text-sm sm:text-base text-gray-600 mb-8">{plan.type || 'Plan details'}</p>
               

                {/* Input Field for Amount */}
                <div className="mb-4">
                  <label className="block text-sm mb-2" htmlFor={`amount-${plan.id}`}>
                    Enter Amount:
                  </label>
                  <input
                    type="number"
                    id={`amount-${plan.id}`}
                    value={amounts[plan.id] || ''}
                    onChange={(e) => handleAmountChange(e, plan)}
                    className={`border rounded w-full py-2 px-3 ${amounts[plan.id] !== undefined ? 'text-black' : 'text-gray-400'}`}
                    placeholder="Enter amount"
                  />
                  <p className="mt-2 text-gray-600">Calculated SMS Count: {smsCounts[plan.id] || 0}</p>
                </div>

                <motion.button
                  className={`py-2 sm:py-3 px-4 sm:px-6 rounded-full font-semibold w-full transition-colors duration-300 ${
                    plan.current
                      ? 'bg-blue-100 text-blue-500 hover:bg-blue-200'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  onClick={() => {
                    handleChoosePlan(plan);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.current ? 'Current Plan' : 'Choose Plan'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Choose Payment Option</h3>
            <p className="mb-4 text-black text-xs sm:text-sm">Select how you want to pay:</p>
            <button
              className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-blue-100 hover:text-blue-400 text-sm sm:text-base"
              onClick={() => {
                onClose();
                buyCreditFromAppWallet();
              }}
            >
              Buy From App Wallet
            </button>
            <button
              className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-blue-100 hover:text-blue-400 text-sm sm:text-base"
              onClick={() => {
                setIsModalOpen(false);
                setIsBuyBundleModalOpen(true);
              }}
            >
              Buy From Mobile Wallet (Coming Soon)
            </button>
            <button
              className="w-full sm:w-24 bg-gray-100 text-gray-800 py-2 mt-4 sm:mt-5 rounded text-sm sm:text-base"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Render BuyBundle Modal for Mobile Wallet */}
      {isBuyBundleModalOpen && (
        <BuyCreditModaltrue
          isOpen={isBuyBundleModalOpen}
          onClose={() => setIsBuyBundleModalOpen(false)}
          selectedPlan={selectedPlan}
          amount={amounts[selectedPlan.id]}
        />
      )}
    </div>
  );
};

export default BundleOptions;
