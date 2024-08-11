import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import WidgetCard from '@/app/Components/Widgets/WidgetCard'; // Import the WidgetCard component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faAddressBook, faUsers, faCoins } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'voiceCalls'>('bulkSMS');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddSenderId = (newSenderId: string) => {
    console.log('New Sender ID:', newSenderId);
    // Handle the new Sender ID submission here
  };

  const widgetData = [
    { value: 2, label: 'Campaigns', icon: faBullhorn, color: 'bg-blue-500' },
    { value: 0, label: 'Contacts', icon: faAddressBook, color: 'bg-green-500' },
    { value: 1, label: 'Groups', icon: faUsers, color: 'bg-yellow-500' },
    { value: 3, label: 'Credit Used', icon: faCoins, color: 'bg-orange-500' },
  ];

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
              {widgetData.map((item, index) => (
                <WidgetCard
                  key={index}
                  value={item.value}
                  label={item.label}
                  icon={item.icon}
                  color={item.color}
                />
              ))}
            </div>

            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
              {/* Billing Summary and Recent SMS Campaign components remain unchanged */}
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
