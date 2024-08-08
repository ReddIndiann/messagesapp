'use client'
import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import TableComponent from '@/app/Components/Tables/SMSCampaignHistory';
const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('campaignHistory');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSenderId = (newSenderId) => {
    // Handle the new Sender ID submission here
    console.log('New Sender ID:', newSenderId);
    // You might want to update your state or make an API call here
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
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 overflow-y-auto`}>
          <div className="mb-4">
            <button
              className={`px-4 py-2 rounded ${currentSection === 'campaignHistory' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setCurrentSection('campaignHistory')}
            >
              Campaign History
            </button>
            <button
              className={`px-4 py-2 rounded ml-2 ${currentSection === 'deliveryReport' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setCurrentSection('deliveryReport')}
            >
              Delivery Report
            </button>
          </div>
          {currentSection === 'campaignHistory' && (
            <TableComponent data={campaignHistoryData} section="campaignHistory" />
          )}
          {currentSection === 'deliveryReport' && (
            <TableComponent data={deliveryReportData} section="deliveryReport" />
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
