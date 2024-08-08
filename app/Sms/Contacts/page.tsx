'use client'

import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUpload, faDownload, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import ContactsTables from '@/app/Components/Tables/ContactTables';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('contacts');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar
          onCollapse={setIsSidebarCollapsed}
          setCurrentSection={setCurrentSection}
        />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 overflow-y-auto`}>
        
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <input type="text" placeholder="Search contact" className="border rounded px-2 py-1" />
                <button className="bg-gray-200 px-4 py-1 rounded flex items-center">
                  <FontAwesomeIcon icon={faSearch} className="w-4 h-4 mr-2" /> Search
                </button>
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
                <FontAwesomeIcon icon={faUpload} className="w-4 h-4 mr-2" /> Import contacts from Excel
              </button>
            </div>
            
           
            
            
            <ContactsTables /> {/* Use the new ContactsTables component here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
