import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Make sure this is defined in your environment

const BundleOptions = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages from the API
  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/packages`);
      setPlans(response.data); // Assuming the API returns an array of packages
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="bg-gray-100 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center">Loading plans...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan: any, index: number) => (
              <motion.div
                key={index}
                className={`bg-white rounded-lg p-6 flex flex-col shadow-lg ${
                  plan.popular ? 'border-4 border-blue-500' : ''
                }`}
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
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-blue-600">Ghc {plan.price}</span>
                  <span className="text-gray-500"> / {plan.expiry || plan.period}</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-8">{plan.type || 'Plan details'}</p>
                <ul className="mb-8 flex-grow">
                  <li className="flex items-center mb-3">
                    <FaCheck className="text-blue-500 mr-3" />
                    <span className="text-sm sm:text-base text-gray-700">
                      Up to {plan.smscount || 'N/A'} messages
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <FaCheck className="text-blue-500 mr-3" />
                    <span className="text-sm sm:text-base text-gray-700">
                      {plan.rate}% bonus
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <FaCheck className="text-blue-500 mr-3" />
                    <span className="text-sm sm:text-base text-gray-700">
                      {plan.duration} days duration
                    </span>
                  </li>
                </ul>
                <motion.button
                  className={`py-2 sm:py-3 px-4 sm:px-6 rounded-full font-semibold w-full transition-colors duration-300 ${
                    plan.current
                      ? 'bg-blue-100 text-blue-500 hover:bg-blue-200'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.current ? 'Current Plan' : 'Purchase'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BundleOptions;
