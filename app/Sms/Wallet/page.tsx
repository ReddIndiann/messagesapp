'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import WalletHistoryTable from '@/app/Components/Tables/WalletHistoryTable';
import BundleHistoryTable from '@/app/Components/Tables/BundleHistoryTable';
import BundleOptions from '@/app/Components/Tables/BundleOptions';
import { FaWallet, FaShoppingCart, FaHistory, FaPlus, FaMinus } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('PurchaseBundle');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentTab('PurchaseBundle');
  }, []);

  const handleAddSenderId = (newSenderId) => {
    console.log('New Sender ID:', newSenderId);
    // Implement sender ID addition logic here
  };

  const TabButton = ({ icon, label, isActive, onClick }) => (
    <button
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 'PurchaseBundle':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">SMS Bundles</h2>
            <p className="text-gray-600 mb-6">Please select a bundle offer</p>
            <BundleOptions />
          </motion.div>
        );
      case 'WalletHistory':
        return <WalletHistoryTable />;
      case 'BundleHistory':
        return <BundleHistoryTable />;
      default:
        return <div>Purchase Bundle Content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        currentSection={currentTab}
        className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-white bg-opacity-75 shadow-sm"
      />
      <div className="flex flex-1 pt-16">
        <Sidebar
          onCollapse={setIsSidebarCollapsed}
          setCurrentSection={setCurrentTab}
          className="bg-white shadow-md"
        />
        <main
          className={`flex-1 ${
            isSidebarCollapsed ? 'ml-20' : 'ml-64'
          } p-8 overflow-y-auto flex`}
        >
          <motion.div
            className="flex-1 bg-white shadow-lg rounded-lg p-6 mr-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
              <div className="flex space-x-2">
                <TabButton
                  icon={<FaShoppingCart className="w-4 h-4" />}
                  label="Purchase Bundle"
                  isActive={currentTab === 'PurchaseBundle'}
                  onClick={() => setCurrentTab('PurchaseBundle')}
                />
                <TabButton
                  icon={<FaWallet className="w-4 h-4" />}
                  label="Wallet History"
                  isActive={currentTab === 'WalletHistory'}
                  onClick={() => setCurrentTab('WalletHistory')}
                />
                <TabButton
                  icon={<FaHistory className="w-4 h-4" />}
                  label="Bundle History"
                  isActive={currentTab === 'BundleHistory'}
                  onClick={() => setCurrentTab('BundleHistory')}
                />
              </div>
            </div>
            <motion.div
              key={currentTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </motion.div>

          {currentTab === 'PurchaseBundle' && (
            <motion.div
              className="w-1/3 bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Wallet Balance</h2>
                <div className="text-3xl font-bold">GHS 0.00</div>
              </div>
              <div className="p-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                  Load Wallet
                </button>
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Recent Transactions
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { label: 'Bundle purchased', amount: -10, date: '2024-08-10' },
                      { label: 'Load Wallet', amount: 10, date: '2024-08-09' },
                      { label: 'Load Wallet', amount: 10, date: '2024-08-08' },
                    ].map((transaction, index) => (
                      <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition duration-200">
                        <div>
                          <span className="text-gray-800 font-medium">{transaction.label}</span>
                          <span className="text-xs text-gray-500 block">{transaction.date}</span>
                        </div>
                        <span
                          className={`font-medium flex items-center ${
                            transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {transaction.amount >= 0 ? <FaPlus className="mr-1" /> : <FaMinus className="mr-1" />}
                          GHS {Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      <AddSenderIdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSenderId}
      />
    </div>
  );
};

export default Dashboard;