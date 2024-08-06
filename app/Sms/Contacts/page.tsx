'use client'

import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('bulkSMS'); // Add state to manage the current section

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentSection={currentSection} /> {/* Pass current section as a prop */}
      <div className="flex flex-1 pt-16">
        <Sidebar 
          onCollapse={setIsSidebarCollapsed} 
          setCurrentSection={setCurrentSection} // Pass setCurrentSection 
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
                  <button className="bg-orange-400 text-white px-3 py-1 text-xs font-semibold rounded">View All</button>
                </div>
                <div className="text-center">
                  <span className="text-4xl font-semibold text-gray-700">3</span>
                  <span className="text-sm text-gray-500">Sender IDs</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 mt-8">
              <div className="bg-white shadow rounded-lg p-6 w-full lg:w-72">
                <h3 className="text-sm font-normal text-gray-500 mb-4">SMS Pricing</h3>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">SMS Price</span>
                    <span className="text-sm font-semibold text-gray-700">N/A</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Voice Price</span>
                    <span className="text-sm font-semibold text-gray-700">N/A</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Data Price</span>
                    <span className="text-sm font-semibold text-gray-700">N/A</span>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-6 w-full lg:w-72">
                <h3 className="text-sm font-normal text-gray-500 mb-4">Account Balance</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">SMS</span>
                  <span className="text-sm font-semibold text-gray-700">N/A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Voice</span>
                  <span className="text-sm font-semibold text-gray-700">N/A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Data</span>
                  <span className="text-sm font-semibold text-gray-700">N/A</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
