'use client'

import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('bulkSMS');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSenderId = (newSenderId) => {
    // Handle the new Sender ID submission here
    console.log('New Sender ID:', newSenderId);
    // You might want to update your state or make an API call here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar 
          onCollapse={setIsSidebarCollapsed} 
          setCurrentSection={setCurrentSection}
        />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 overflow-y-auto`}>
          <div className="max-w-7xl mx-auto">
            <p className="text-red-500 text-sm mb-6">Overview page displays data from the past 3 days.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {[
                { value: 2, label: 'Campaigns' },
                { value: 0, label: 'Contacts' },
                { value: 1, label: 'Groups' },
                { value: 3, label: 'Credit Used' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gray-700">{item.value}</div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
              <div className="bg-white shadow rounded-lg p-2 flex-grow">
                <h3 className="text-lg font-semibold mb-4">Billing Summary</h3>
                <div className="flex justify-end items-center mb-4 space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-500">Credit Used</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-500">Recipient</span>
                  </div>
                </div>
                <div className="flex space-x-2 h-64">
                  <div className="w-1/2 bg-orange-400 rounded"></div>
                  <div className="w-1/2 bg-blue-500 rounded"></div>
                </div>
                <div className="text-center mt-2 text-sm text-gray-500">August 2, 2024</div>

                <div className="bg-white shadow rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-600">Recent SMS Campaign</h3>
                  <div className="flex items-center">
                    <div className="relative w-72 h-72">
                      <svg viewBox="0 0 36 36" className="w-full h-full">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#4ade80"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs text-gray-500">Total Messages</span>
                        <span className="text-2xl font-bold text-gray-500">3</span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center mr-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">3</span>
                        </div>
                        <span className="text-sm text-gray-600">Delivered</span>
                        <span className="text-sm font-semibold ml-4 text-gray-600">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6 w-full lg:w-72 h-96">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-normal text-gray-500">Sender ID</h3>
                  <button 
                    className="bg-orange-400 text-white px-3 py-1 rounded-md text-sm font-medium"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Sender ID
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Daniel</span>
                    <div className="flex items-center space-x-24">
                      <div className="bg-green-500 text-white rounded-full p-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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