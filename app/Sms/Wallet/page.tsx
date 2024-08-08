'use client'


import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import WalletHistoryTable from '@/app/Components/Tables/WalletHistoryTable';
import BundleHistoryTable from '@/app/Components/Tables/BundleHistoryTable';
import BundleOptions from '@/app/Components/Tables/BundleOptions';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('PurchaseBundle');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSenderId = (newSenderId) => {
    console.log('New Sender ID:', newSenderId);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'PurchaseBundle':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700">SMS Bundles</h2>
              <p className="text-gray-500">Please select a bundle offer</p>
            </div>
            <BundleOptions /> {/* Add this line */}
          </div>
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
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentSection={currentTab} />
      <div className="flex flex-1 pt-16">
        <Sidebar 
          onCollapse={setIsSidebarCollapsed} 
          setCurrentSection={setCurrentTab}
        />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 overflow-y-auto flex`}>
          {/* Left column for tabs and content */}
          <div className="flex-1 bg-white shadow-md rounded-md p-4 mr-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-700">SMS Bundles</h2>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 text-sm font-medium ${currentTab === 'PurchaseBundle' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
                  onClick={() => {
                    setCurrentTab('PurchaseBundle');
                    setIsSidebarCollapsed(false);
                  }}
                >
                  Purchase Bundle
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${currentTab === 'WalletHistory' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
                  onClick={() => {
                    setCurrentTab('WalletHistory');
                    setIsSidebarCollapsed(true);
                  }}
                >
                  Wallet History
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${currentTab === 'BundleHistory' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
                  onClick={() => {
                    setCurrentTab('BundleHistory');
                    setIsSidebarCollapsed(true);
                  }}
                >
                  Bundle History
                </button>
              </div>
            </div>
            <div className="mt-4">
              {renderContent()}
            </div>
          </div>

          {/* Right column for Wallet Balance and Data */}
          {currentTab !== 'WalletHistory' && currentTab !== 'BundleHistory' && (
            <div className="w-1/3 bg-gray-50 shadow-md rounded-md p-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-semibold text-gray-700">Wallet Balance</h2>
                <div className="text-lg font-bold text-green-600">GHS 0.00</div>
              </div>
              <div className="mt-4">
                <button className="bg-orange-500 text-white py-2 px-4 rounded-md w-full">
                  Load Wallet
                </button>
              </div>
              <div className="mt-4 border-t pt-4">
                <h3 className="text-md font-semibold text-gray-600">Recent Transactions</h3>
                <ul className="mt-2 text-gray-700 space-y-2">
                  <li className="flex justify-between">
                    <span>Bundle purchased</span>
                    <span className="text-red-500">GHS 10.00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Load Wallet</span>
                    <span className="text-green-500">GHS 10.00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Load Wallet</span>
                    <span className="text-green-500">GHS 10.00</span>
                  </li>
                </ul>
              </div>
            </div>
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
