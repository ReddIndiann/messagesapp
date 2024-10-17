'use client'
import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';
import ContactsTables from '@/app/Components/Tables/ContactTables';
import ExcelUploadStepper from '@/app/Components/Modals/GroupsandContacts/ExportExcelSend';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'Developer' | 'admin'>('bulkSMS');
  const [isExportExcelModalOpen, setIsExportExcelModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query

  const handleExportExcelClick = () => {
    setIsExportExcelModalOpen(true);
    console.log('pressed');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar
          onCollapse={setIsSidebarCollapsed}
          setCurrentSection={setCurrentSection}
        />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-4 sm:p-6 lg:p-8 overflow-y-auto`}>
          <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-600">Contacts</h1>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search contact"
                  value={searchQuery} // Bind the input to searchQuery
                  onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
                  className="border border-gray-300 rounded-lg text-slate-950 px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300">
                  <FontAwesomeIcon icon={faSearch} className="w-4 h-4 mr-2" /> Search
                </button>
              </div>
              <div className="flex justify-end w-full sm:w-auto">
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-green-600 transition duration-300 w-full sm:w-auto"
                  onClick={handleExportExcelClick}
                >
                  <FontAwesomeIcon icon={faDownload} className="w-4 h-4 mr-2" /> Import
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mt-4">
              <ContactsTables searchQuery={searchQuery} /> {/* Pass searchQuery to ContactsTables */}
            </div>
          </div>
        </main>
      </div>
      <ExcelUploadStepper
        isOpen={isExportExcelModalOpen}
        onClose={() => setIsExportExcelModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;