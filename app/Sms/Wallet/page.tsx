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
      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
        isActive
          ? 'text-blue-600 border-blue-600'
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
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
            className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center border-b border-gray-200 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-800 px-6 py-3">Dashboard</h2>
              <div className="flex bg-white">
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
            <div className="p-6">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </div>
          </motion.div>

          {currentTab === 'PurchaseBundle' && (
            <motion.div
              className="w-1/3 bg-white shadow-lg rounded-lg overflow-hidden ml-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
                  <div className="text-4xl font-bold tracking-tight">GHS 0.00</div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
              </div>
              <div className="p-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center justify-center">
                  <FaWallet className="mr-2" />
                  Load Wallet
                </button>
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h3>
                  <div className="overflow-hidden shadow-sm rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaction
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { label: 'Bundle purchased', amount: -10, date: '2024-08-10' },
                          { label: 'Load Wallet', amount: 10, date: '2024-08-09' },
                          { label: 'Load Wallet', amount: 10, date: '2024-08-08' },
                        ].map((transaction, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{transaction.label}</div>
                              <div className="text-sm text-gray-500">{transaction.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  transaction.amount >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {transaction.amount >= 0 ? <FaPlus className="mr-1 w-3 h-3" /> : <FaMinus className="mr-1 w-3 h-3" />}
                                GHS {Math.abs(transaction.amount).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View all transactions
                    </button>
                  </div>
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