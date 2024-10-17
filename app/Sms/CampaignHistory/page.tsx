'use client'

import React, { useState, useEffect,FC } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';

import TableComponent from '@/app/Components/Tables/SMSCampaignHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faFileAlt, faPlus ,IconDefinition} from '@fortawesome/free-solid-svg-icons';

const Dashboard: FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'Developer' | 'admin'>('bulkSMS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [currentTabSection, setCurrentTabSection] = useState('');

  useEffect(() => {
    setCurrentTabSection('campaignHistory');
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);



  interface TabButtonProps {
    icon: IconDefinition;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }

  const TabButton: FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => (
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
        <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
      <Sidebar onCollapse={setIsSidebarCollapsed} setCurrentSection={setCurrentSection} />
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
             
              </div>
            </div>

            <div className="border-b border-gray-200">
              <div className="flex">
                <TabButton
                  icon={faHistory}
                  label="Sms History"
                  isActive={currentTabSection === 'campaignHistory'}
                  onClick={() => setCurrentTabSection('campaignHistory')}
                />
                <TabButton
                  icon={faFileAlt}
                  label="Delivery Report"
                  isActive={currentTabSection === 'deliveryReport'}
                  onClick={() => setCurrentTabSection('deliveryReport')}
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
                    section={currentTabSection}
                    userId={userId}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>

  
    </div>
  );
};

export default Dashboard;
