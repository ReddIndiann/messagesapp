import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaLightbulb } from 'react-icons/fa';

const BundleOptions = () => {
  const plans = [
    {
      title: 'Free',
      price: '$0',
      period: '/ mo',
      subtext: 'Free forever',
      features: [
        '30 days history',
        'Up to 1000 messages/mo',
        'Limited AI capabilities',
      ],
      buttonText: 'Current plan',
      current: true,
    },
    {
      title: 'Pro',
      price: '$89',
      period: '/ mo',
      subtext: 'Per month, per team member',
      features: [
        'Email support',
        'Unlimited messages',
        'Access to AI capabilities',
      ],
      buttonText: 'Upgrade',
    },
    {
      title: 'Enterprise',
      price: '$399',
      period: '/ mo',
      subtext: 'Per month, per team member',
      features: [
        'Customizable AI models',
        'Advanced team management',
        'Enterprise-level support',
      ],
      buttonText: 'Upgrade',
      popular: true,
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
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
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{plan.title}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <p className="text-gray-600 mb-8">{plan.subtext}</p>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center mb-3">
                    <FaCheck className="text-blue-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                className={`py-3 px-6 rounded-full font-semibold w-full transition-colors duration-300 ${
                  plan.current
                    ? 'bg-blue-100 text-blue-500 hover:bg-blue-200'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BundleOptions;