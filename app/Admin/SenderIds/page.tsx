'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import TableComponent from '@/app/Components/Tables/SenderIdManagement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faPlus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState<'pending' | 'approved'>('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

  const handleAddSenderId = (newSenderId) => {
    console.log('New Sender ID:', newSenderId);
    // Handle the new Sender ID submission here
  };

  const TabButton = ({ label, isActive, onClick }) => (
    <button
      className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'text-blue-500 hover:bg-blue-50'
      }`}
      onClick={onClick}
    >
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
                <h1 className="text-2xl font-bold text-white">Manage Sender IDs</h1>
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
                  label="Pending"
                  isActive={currentSection === 'pending'}
                  onClick={() => setCurrentSection('pending')}
                />
                <TabButton
                  label="Approved"
                  isActive={currentSection === 'approved'}
                  onClick={() => setCurrentSection('approved')}
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
                {userId && (
                  <TableComponent
                    section={currentSection}
                    userId={userId}
                  />
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
