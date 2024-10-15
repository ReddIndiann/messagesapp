'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import WalletHistoryTable from '@/app/Components/Tables/WalletHistoryTable';
import BundleHistoryTable from '@/app/Components/Tables/BundleHistoryTable';
import BundleOptions from '@/app/Components/Tables/BundleOptions';
import BundleOptionsTrue from '@/app/Components/Tables/UserEntryBundle';
import { FaWallet, FaShoppingCart, FaHistory } from 'react-icons/fa';
import { userdetails } from '@/app/lib/authUtils';
import DepositeWallet from '@/app/Components/Modals/WalletBundleModal/depositeWallet';

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'Developer' | 'admin'>('bulkSMS');
  const [currentTab, setCurrentTab] = useState('PurchaseBundle');
  const [walletBalance, setWalletBalance] = useState(0.0);
  const [userId, setUserId] = useState<number | null>(null);
  const [isDepositeModalOpen, setIsDepositeModalOpen] = useState<boolean>(false);

  // Set user ID from local storage and fetch user details on component mount
  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId ? Number(extractedUserId) : null);

      const fetchUserDetails = async () => {
        if (extractedUserId) {
          try {
            const userDetails = await userdetails(extractedUserId);
            setWalletBalance(userDetails.walletbalance || 0.0); // Set wallet balance from user details
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        }
      };

      fetchUserDetails();

    }
  }, []);
  const handleBalanceUpdate = (newBalance: number) => {
    setWalletBalance(newBalance);
  };

  interface TabButtonProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }
  
  const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => (
    // your button code
    <button
      className={`flex items-center px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 border-b-2 ${
        isActive ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-1 sm:ml-2">{label}</span>
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">SMS Bundles</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">Please select a bundle offer</p>
            <BundleOptionsTrue />
            <p className="text-sm sm:text-base text-gray-600 mb-6">Please select a bundle offer</p>
            <BundleOptions 
            onBalanceUpdate={handleBalanceUpdate}// Pass the handler here
            />
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
  const handleDepositSuccess = (amount: number) => {
    setWalletBalance((prevBalance) => prevBalance + amount); // Update the wallet balance
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar onCollapse={setIsSidebarCollapsed} setCurrentSection={setCurrentSection} />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-0 sm:ml-64'} p-4 sm:p-8 overflow-y-auto flex flex-col lg:flex-row`}>
          <motion.div
            className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden mb-4 lg:mb-0 lg:mr-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 px-4 sm:px-6 py-3">Dashboard</h2>
              <div className="flex bg-white w-full sm:w-auto overflow-x-auto">
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
            <div className="p-4 sm:p-6">
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
              className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">Wallet Balance</h2>
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight">GHS {walletBalance.toFixed(2)}</div>
                </div>
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white opacity-10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
                <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-white opacity-10 rounded-full -ml-10 sm:-ml-12 -mb-10 sm:-mb-12"></div>
              </div>
              <div className="p-4 sm:p-6">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg w-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center justify-center"
                  onClick={() => setIsDepositeModalOpen(true)}
                >
                  <FaWallet className="mr-2" />
                  Load Wallet
                </button>
                <div className="mt-4 sm:mt-6 border-t pt-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">Recent Transactions</h3>
                  <WalletHistoryTable /> {/* Include WalletHistoryTable here */}
                </div>
                <DepositeWallet 
              isOpen={isDepositeModalOpen} 
              onClose={() => setIsDepositeModalOpen(false)} 
              onDepositSuccess={handleDepositSuccess} 
              
            />
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
