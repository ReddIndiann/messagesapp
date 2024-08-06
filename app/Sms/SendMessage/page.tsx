'use client';

import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateTemplateModal from '@/app/Components/Modals/CreatTemplateModal';
import SendMessageModal from '@/app/Components/Modals/SendMessageModal';
const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('bulkSMS');
  const [activeTab, setActiveTab] = useState('messageTemplates');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);

  // Placeholder data for SMS campaigns
  const smsCampaigns = [
    {
      id: 1,
      title: 'FriendsList',
      content: 'This is it bros',
      type: 'SMS',
      date: 'Fri 2 Aug, 2024 2:12:22 pm',
    },
    // More campaigns...
  ];

  const scheduledMessages = [
    {
      id: 1,
      title: 'Meeting Reminder',
      content: "Don't forget our meeting at 3 PM.",
      type: 'Scheduled',
      scheduled: 'Fri 2 Aug, 2024 1:12:22 pm',
      lastseen: 'Fri 2 Aug, 2024 1:12:22 pm',
      recipient: 'John Doe',
      status: 'COMPLETE',
      repeatperiod: 'None',
    },
    // More scheduled messages...
  ];

  const MessageTemplatesTable = () => (
    <table className="min-w-full bg-white border-collapse">
      <thead className="bg-gray-100 text-slate-600">
        <tr>
          <th className="py-2 px-4 text-left border-b">Message Title</th>
          <th className="py-2 px-4 text-left border-b">Content</th>
          <th className="py-2 px-4 text-left border-b">Message Type</th>
          <th className="py-2 px-4 text-left border-b">Date and Time</th>
          <th className="py-2 px-4 text-left border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {smsCampaigns.map(campaign => (
          <tr key={campaign.id} className="border-t">
            <td className="py-4 px-4 text-gray-500 border-b">{campaign.title}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{campaign.content}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{campaign.type}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{campaign.date}</td>
            <td className="py-4 px-4 flex space-x-2 border-b">
              <button className="text-gray-300 text-xl">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              <button className="text-gray-300 text-xl">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="text-gray-300 text-xl">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const ScheduledMessagesTable = () => (
    <table className="min-w-full bg-white border-collapse">
      <thead className="bg-gray-100 text-slate-600">
        <tr>
          <th className="py-2 px-4 text-left border-b">Message Title</th>
          <th className="py-2 px-4 text-left border-b">Content</th>
          <th className="py-2 px-4 text-left border-b">Schedule</th>
          <th className="py-2 px-4 text-left border-b">Last Sent</th>
          <th className="py-2 px-4 text-left border-b">Recipient</th>
          <th className="py-2 px-4 text-left border-b">Status</th>
          <th className="py-2 px-4 text-left border-b">Repeat Period</th>
          <th className="py-2 px-4 text-left border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {scheduledMessages.map(message => (
          <tr key={message.id} className="border-t">
            <td className="py-4 px-4 text-gray-500 border-b">{message.title}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{message.content}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{message.scheduled}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{message.lastseen}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{message.recipient}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{message.status}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{message.repeatperiod}</td>
            <td className="py-4 px-4 flex space-x-2 border-b">
              <button className="text-gray-300 text-xl">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              <button className="text-gray-300 text-xl">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="text-gray-300 text-xl">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

   return (
    <div className={`min-h-screen bg-gray-100 flex flex-col ${isModalOpen || isSendMessageModalOpen ? 'overflow-hidden' : ''}`}>
      {/* ... other JSX ... */}
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar 
          onCollapse={setIsSidebarCollapsed} 
          setCurrentSection={setCurrentSection}
        />
         <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 overflow-y-auto ${isModalOpen || isSendMessageModalOpen ? 'blur' : ''}`}>
         {/* ... other JSX ... */}
         <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6 text-xl border border-gray-300 p-4 rounded-lg">
              <div>
                <button 
                  className={`px-4 py-3 rounded-xl mr-4 text-base border ${activeTab === 'messageTemplates' ? 'bg-gray-100 text-orange-600 border-orange-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                  onClick={() => setActiveTab('messageTemplates')}
                >
                  Message Templates
                </button>
                <button 
                  className={`px-4 py-3 rounded-xl mr-4 text-base border ${activeTab === 'scheduledMessages' ? 'bg-gray-100 text-orange-600 border-orange-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                  onClick={() => setActiveTab('scheduledMessages')}
                >
                  Scheduled Messages
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-xl text-base border border-gray-300">International Messages</button>
              </div>
              <div>
          {activeTab === 'messageTemplates' && (
            <button 
              className="bg-orange-400 text-white px-4 py-2 rounded-full mr-4 text-base"
              onClick={() => setIsModalOpen(true)}
            >
              Create Message Template
            </button>
          )}
          <button 
            className="bg-orange-400 text-white px-4 py-2 rounded-full text-base"
            onClick={() => setIsSendMessageModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            {activeTab === 'scheduledMessages' ? 'Schedule Message' : 'Send Message'}
          </button>
        </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              {activeTab === 'messageTemplates' ? 'Send SMS Campaign' : 'Scheduled Messages'}
            </h2>
            {activeTab === 'messageTemplates' ? <MessageTemplatesTable /> : <ScheduledMessagesTable />}
          </div>
          <div className="flex justify-center mt-6 mb-4">
            <button className="bg-yellow-100 px-3 py-1 rounded-l-lg text-slate-400">❮</button>
            <button className="bg-orange-400 text-white px-3 py-1">1</button>
            <button className="bg-yellow-100 px-3 py-1 rounded-r-lg text-slate-400">❯</button>
          </div>
        </main>
      </div>
      <CreateTemplateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <SendMessageModal
        isOpen={isSendMessageModalOpen}
        onClose={() => setIsSendMessageModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;