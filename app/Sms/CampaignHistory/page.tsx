'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import TableComponent from '@/app/Components/Tables/SMSCampaignHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faFileAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('campaignHistory'); // Default section
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('Dashboard rendered. Current Section:', currentSection);
  }, [currentSection]);

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

  const deliveryReportData = []; // You can add delivery report data here

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar
          onCollapse={setIsSidebarCollapsed}
          setCurrentSection={setCurrentSection}
        />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-8 overflow-y-auto`}>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">SMS Campaigns</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Sender ID
              </button>
            </div>

            <div className="mb-6">
              <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50">
                <button
                  className={`px-4 py-2 rounded-l-lg flex items-center ${
                    currentSection === 'campaignHistory'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentSection('campaignHistory')}
                >
                  <FontAwesomeIcon icon={faHistory} className="mr-2" />
                  Campaign History
                </button>
                <button
                  className={`px-4 py-2 rounded-r-lg flex items-center ${
                    currentSection === 'deliveryReport'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentSection('deliveryReport')}
                >
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                  Delivery Report
                </button>
              </div>
            </div>

            {currentSection === 'campaignHistory' && (
              <TableComponent data={campaignHistoryData} section="campaignHistory" />
            )}
            {currentSection === 'deliveryReport' && (
              <TableComponent data={deliveryReportData} section="deliveryReport" />
            )}
          </div>
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
