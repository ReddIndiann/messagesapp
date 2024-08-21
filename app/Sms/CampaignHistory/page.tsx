'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import TableComponent from '@/app/Components/Tables/SMSCampaignHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faFileAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentSection('campaignHistory');
  }, []);

  const handleAddSenderId = (newSenderId) => {
    console.log('New Sender ID:', newSenderId);
    // Handle the new Sender ID submission here
  };

  const campaignHistoryData = [
    { name: 'hii', totalRecipients: 1, senderId: 'Daniel', dateTime: 'Wed, Aug 7, 2024 8:48 AM', totalCreditUsed: 1, walletBalanceUsed: 0 },
    { name: 'kin', totalRecipients: 1, senderId: 'Daniel', dateTime: 'Tue, Aug 6, 2024 2:09 PM', totalCreditUsed: 1, walletBalanceUsed: 0 },
    { name: 'API Message - (v1)', totalRecipients: 2, senderId: 'Daniel', dateTime: 'Fri, Aug 2, 2024 1:51 PM', totalCreditUsed: 2, walletBalanceUsed: 0 },
    { name: 'Gridguard', totalRecipients: 1, senderId: 'Daniel', dateTime: 'Fri, Aug 2, 2024 1:33 PM', totalCreditUsed: 1, walletBalanceUsed: 0 },
  ];

  const deliveryReportData = []; 

  const TabButton = ({ icon, label, isActive, onClick }) => (
    <button
      className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'text-blue-500 hover:bg-blue-50'
      }`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentSection={currentSection} className="bg-white shadow-md" />
      <div className="flex flex-1 pt-16">
        <Sidebar
          onCollapse={setIsSidebarCollapsed}
          setCurrentSection={setCurrentSection}
          className="bg-white shadow-md"
        />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-8 overflow-y-auto`}>
          <motion.div 
            className="bg-white shadow-lg rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-400 to-blue-900 p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">SMS Campaigns</h1>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-300 flex items-center"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Sender ID
                </button>
              </div>
            </div>

            <div className="border-b border-gray-200">
              <div className="flex">
                <TabButton
                  icon={faHistory}
                  label="Campaign History"
                  isActive={currentSection === 'campaignHistory'}
                  onClick={() => setCurrentSection('campaignHistory')}
                />
                <TabButton
                  icon={faFileAlt}
                  label="Delivery Report"
                  isActive={currentSection === 'deliveryReport'}
                  onClick={() => setCurrentSection('deliveryReport')}
                />
              </div>
            </div>

            <div className="p-6">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentSection === 'campaignHistory' && (
                  <TableComponent data={campaignHistoryData} section="campaignHistory" />
                )}
                {currentSection === 'deliveryReport' && (
                  <TableComponent data={deliveryReportData} section="deliveryReport" />
                )}
              </motion.div>
            </div>
          </motion.div>
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