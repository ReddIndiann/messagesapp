'use client'
import React, { useState, useEffect } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faAddressBook, faUsers, faCoins } from '@fortawesome/free-solid-svg-icons';
import BasicBars from '@/app/Components/Graph/Graph'; // Adjust the import path as needed

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'voiceCalls'>('bulkSMS');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [senderIds, setSenderIds] = useState<any[]>([]); // State to hold sender IDs

  useEffect(() => {
    // Retrieve and parse the signInResponse from localStorage
    const signInResponse = localStorage.getItem('signInResponse');
    
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
      console.log('Extracted User ID:', extractedUserId);

      if (extractedUserId) {
        // Fetch sender IDs for the user
        fetchSenderIds(extractedUserId);
      }
    }

    // Log all localStorage details
    console.log('LocalStorage contents:', localStorage);
  }, []); // Empty dependency array to run this effect only once when the component mounts

  const fetchSenderIds = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/senders/user/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to fetch sender IDs');
      }

      setSenderIds(data); // Update state with the fetched sender IDs
      console.log('Fetched Sender IDs:', data);
    } catch (err: any) {
      console.error('Error fetching sender IDs:', err.message || 'An error occurred');
    }
  };

  const handleAddSenderId = (newSenderId: string) => {
    console.log('New Sender ID:', newSenderId);
    // Handle the new Sender ID submission here
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
                { value: 2, label: 'Campaigns', icon: faBullhorn, color: 'bg-blue-500' },
                { value: 0, label: 'Contacts', icon: faAddressBook, color: 'bg-green-500' },
                { value: 1, label: 'Groups', icon: faUsers, color: 'bg-yellow-500' },
                { value: 3, label: 'Credit Used', icon: faCoins, color: 'bg-orange-500' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-white shadow-lg rounded-lg p-6"
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} text-white`}
                  >
                    <FontAwesomeIcon icon={item.icon} size="lg" />
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-semibold text-gray-700">{item.value}</div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
              <div className="bg-white shadow rounded-lg p-6 flex-grow">
                <h3 className="text-lg font-semibold mb-4 text-gray-600">Billing Summary</h3>
                <BasicBars />
              </div>

              <div className="bg-white shadow rounded-lg p-6 w-full lg:w-72 h-96 lg:flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-normal text-gray-500">Sender ID</h3>
                  <button 
                    className="bg-blue-400 text-white px-3 py-1 rounded-md text-sm font-medium"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Sender ID
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  {senderIds.map((sender, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-slate-600">{sender.name}</span>
                      <div className="flex items-center space-x-24">
                        <div 
                          className={`rounded-full p-1 ${
                            sender.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                          } text-white`}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
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
