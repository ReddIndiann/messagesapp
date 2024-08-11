'use client';

import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';
import MessageTemplatesTable from '@/app/Components/Tables/MessageTemplateTable';
import ScheduledMessageTable from '@/app/Components/Tables/ScheduledMessageTable';
import InternationalMessagesTable from '@/app/Components/Tables/InternationalMessagesTable';
import CreateTemplateModal from '@/app/Components/Modals/CreateTemplateModal';
import SendMessageOptionsModal from '@/app/Components/Modals/SendMessageOptionsModal';
import QuickSMSModal from '@/app/Components/Modals/SendQuicksms';
import ScheduleQuickSms from '@/app/Components/Modals/ScheduleQuickSms';
import SendToGroupModal from '@/app/Components/Modals/SendToGroupModal';
import ScheduleToGroupStepper from '@/app/Components/Modals/ScheduleToGroupModal';
import ScheduleMessageOptions from '@/app/Components/Modals/ScheduleMessageOptions';

// Define types for the Dashboard component
const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string>('bulkSMS');
  const [activeMainTab, setActiveMainTab] = useState<'messages' | 'scheduled' | 'international'>('messages');
  const [isCreateTemplateModalOpen, setIsCreateTemplateModalOpen] = useState<boolean>(false);
  const [isSendMessageOptionsModalOpen, setIsSendMessageOptionsModalOpen] = useState<boolean>(false);
  const [isQuickSMSModalOpen, setIsQuickSMSModalOpen] = useState<boolean>(false);
  const [isScheduleQuickSMSModalOpen, setIsScheduleQuickSMSModalOpen] = useState<boolean>(false);
  const [isScheduleToGroupModalOpen, setIsScheduleToGroupModalOpen] = useState<boolean>(false);
  const [isSendToGroupModalOpen, setIsSendToGroupModalOpen] = useState<boolean>(false);
  const [isScheduleMessageOptionsOpen, setIsScheduleMessageOptionsOpen] = useState<boolean>(false);

  const smsCampaigns = [
    { id: 1, title: 'FriendsList', content: 'This is it bros', type: 'SMS', date: 'Fri 2 Aug, 2024 2:12:22 pm' },
  ];

  const scheduledMessages = [
    { id: 1, title: 'Meeting Reminder', content: "Don't forget our meeting at 3 PM.", type: 'Scheduled', scheduled: 'Fri 2 Aug, 2024 1:12:22 pm', lastseen: 'Fri 2 Aug, 2024 1:12:22 pm', recipient: 'John Doe', status: 'COMPLETE', repeatperiod: 'None' },
  ];

  const internationalMessages = [
    { country: 'USA', code: '+1', internationalRate: '0.10', localRate: '0.05' },
    { country: 'Canada', code: '+1', internationalRate: '0.09', localRate: '0.04' },
  ];

  const internationalCampaigns = [
    { title: 'Holiday Promo', content: 'Enjoy our holiday discounts!', countries: ['USA', 'Canada'], status: 'Active' },
  ];

  const mainTabs = [
    { id: 'messages', label: 'Messages' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'international', label: 'International' },
  ];

  const handleMainTabClick = (tabId: 'messages' | 'scheduled' | 'international') => {
    setActiveMainTab(tabId);
  };

  const handleQuickSMSClick = () => {
    setIsSendMessageOptionsModalOpen(false);
    setIsQuickSMSModalOpen(true);
  };

  const handleScheduleQuickSmsClick = () => {
    setIsScheduleMessageOptionsOpen(false);
    setIsScheduleQuickSMSModalOpen(true);
  };

  const handleSendToGroupClick = () => {
    setIsSendMessageOptionsModalOpen(false);
    setIsSendToGroupModalOpen(true);
  };

  const handleScheduleToGroupClick = () => {
    setIsScheduleMessageOptionsOpen(false);
    setIsScheduleToGroupModalOpen(true);
  };

  const handleNextFromQuickSMS = () => {
    setIsQuickSMSModalOpen(false);
  };

  const handleSendToGroup = () => {
    setIsSendToGroupModalOpen(false);
  };

  const handleScheduleToGroup = () => {
    setIsScheduleToGroupModalOpen(false);
  };

  const renderActionButtons = () => {
    if (activeMainTab === 'messages') {
      return (
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition duration-300"
            onClick={() => setIsCreateTemplateModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Template
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition duration-300"
            onClick={() => setIsSendMessageOptionsModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Send Message
          </button>
        </div>
      );
    } else if (activeMainTab === 'scheduled') {
      return (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition duration-300"
          onClick={() => setIsScheduleMessageOptionsOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Schedule Message
        </button>
      );
    } else if (activeMainTab === 'international') {
      return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition duration-300">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create New Template
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar onCollapse={setIsSidebarCollapsed} setCurrentSection={setCurrentSection} />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} p-4 md:p-6 lg:p-8 overflow-y-auto`}>
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {mainTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-6 py-3 font-medium text-sm ${activeMainTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleMainTabClick(tab.id as 'messages' | 'scheduled' | 'international')}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex justify-end items-center border-b border-gray-200 px-6 py-3">
              <div>
                {renderActionButtons()}
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 gap-6">
              {activeMainTab === 'messages' && <MessageTemplatesTable campaigns={smsCampaigns} />}
              {activeMainTab === 'scheduled' && <ScheduledMessageTable campaigns={scheduledMessages} />}
              {activeMainTab === 'international' && <InternationalMessagesTable messages={internationalMessages} campaigns={internationalCampaigns} />}
            </div>
          </div>
        </main>
      </div>

      {/* Render the modals */}
      <CreateTemplateModal isOpen={isCreateTemplateModalOpen} onClose={() => setIsCreateTemplateModalOpen(false)} />
      <SendMessageOptionsModal
        isOpen={isSendMessageOptionsModalOpen}
        onClose={() => setIsSendMessageOptionsModalOpen(false)}
        onQuickSMSClick={handleQuickSMSClick}
        onSendToGroupClick={handleSendToGroupClick}
      />
      <QuickSMSModal
        isOpen={isQuickSMSModalOpen}
        onClose={() => setIsQuickSMSModalOpen(false)}
        onNext={handleNextFromQuickSMS}
      />
      <ScheduleQuickSms
        isOpen={isScheduleQuickSMSModalOpen}
        onClose={() => setIsScheduleMessageOptionsOpen(false)}
        onNext={handleScheduleQuickSmsClick}
      />
      <SendToGroupModal
        isOpen={isSendToGroupModalOpen}
        onClose={() => setIsSendToGroupModalOpen(false)}
        onSend={handleSendToGroup}
      />
      <ScheduleToGroupStepper
        isOpen={isScheduleToGroupModalOpen}
        onClose={() => setIsScheduleToGroupModalOpen(false)}
        onSend={handleScheduleToGroup}
      />
      <ScheduleMessageOptions
        isOpen={isScheduleMessageOptionsOpen}
        onClose={() => setIsScheduleMessageOptionsOpen(false)}
        onScheduleQuickSMSClick={handleScheduleQuickSmsClick}
        onScheduleToGroupClick={handleScheduleToGroupClick}
      />
    </div>
  );
};

export default Dashboard;
