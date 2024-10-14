'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import TableComponent, { TableComponentRef } from '@/app/Components/Tables/ApiKeyTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import ApiKeyCreation from '@/app/Components/Modals/ApiKeyModal';

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'Developer' | 'admin'>('bulkSMS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const tableRef = useRef<TableComponentRef>(null);

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

  const handleApiKeyCreationSuccess = () => {
    if (tableRef.current) {
      tableRef.current.refreshData();
    }
  };

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
                <h1 className="text-2xl font-bold text-white">API KEYS</h1>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-300 flex items-center"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Create ApiKeys
                </button>
              </div>
            </div>

            <div className="p-6">
              {userId && (
                <TableComponent 
                  userId={userId} 
                  ref={tableRef}
                />
              )}
              <button
                className='text-gray-900 text-lg mt-5'
                onClick={() => router.push('/Developer/Documentation')}
              >
                Visit the <span className='text-sky-500'>documentation page....</span>
              </button>
            </div>
          </motion.div>
        </main>
      </div>
      <ApiKeyCreation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        onSuccess={handleApiKeyCreationSuccess}
      />
    </div>
  );
};

export default Dashboard;