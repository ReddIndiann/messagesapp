'use client'

import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUpload, faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';
import ContactsTables from '@/app/Components/Tables/ContactTables';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('contacts');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar
          onCollapse={setIsSidebarCollapsed}
          setCurrentSection={setCurrentSection}
        />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-8 overflow-y-auto`}>
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Contacts</h1>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              <div className="flex space-x-4 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search contact" 
                  className="border border-gray-300 rounded-lg px-4 py-2 flex-grow md:flex-grow-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-300">
                  <FontAwesomeIcon icon={faSearch} className="w-4 h-4 mr-2" /> Search
                </button>
              </div>
              <div className="flex space-x-4 w-full md:w-auto">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-green-600 transition duration-300">
                  <FontAwesomeIcon icon={faUpload} className="w-4 h-4 mr-2" /> Import
                </button>
                <button className="bg-purple-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-purple-600 transition duration-300">
                  <FontAwesomeIcon icon={faDownload} className="w-4 h-4 mr-2" /> Export
                </button>
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-indigo-600 transition duration-300">
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" /> Add Contact
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <ContactsTables />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;