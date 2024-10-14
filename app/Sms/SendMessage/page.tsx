'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';
import MessageTemplatesTable from '@/app/Components/Tables/MessageTemplateTable';
import ScheduledMessageTable from '@/app/Components/Tables/ScheduledMessageTable';
import InternationalMessagesTable from '@/app/Components/Tables/InternationalMessagesTable';
import CreateTemplateModal from '@/app/Components/Modals/MessageTemplate/CreateTemplateModal';
import SendMessageOptionsModal from '@/app/Components/Modals/SendMessageOptionsModal';
import QuickSMSModal from '@/app/Components/Modals/SendQuicksms';
import ScheduleQuickSms from '@/app/Components/Modals/ScheduleQuickSms';
import SendToGroupModal from '@/app/Components/Modals/SendToGroupModal';
import ScheduleToGroupStepper from '@/app/Components/Modals/ScheduleToGroupModal';
import ScheduleMessageOptions from '@/app/Components/Modals/ScheduleMessageOptions';
import ExportExcelContactStepper from '@/app/Components/Modals/ExportExcelSend';
import { fetchMessageTemplates,fetchScheduleMessage } from '@/app/lib/createTemplateUtils'; // Adjust the path as necessary
import ExcelUploadScheduleStepper from '@/app/Components/Modals/ExportExcelSchedule';




const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'Developer' | 'admin'>('bulkSMS');
  const [activeMainTab, setActiveMainTab] = useState<'messages' | 'scheduled' | 'international'>('messages');
  const [isCreateTemplateModalOpen, setIsCreateTemplateModalOpen] = useState<boolean>(false);
  const [isSendMessageOptionsModalOpen, setIsSendMessageOptionsModalOpen] = useState<boolean>(false);
  const [isQuickSMSModalOpen, setIsQuickSMSModalOpen] = useState<boolean>(false);
  const [isScheduleQuickSMSModalOpen, setIsScheduleQuickSMSModalOpen] = useState<boolean>(false);
  const [isExportExcelOpen, setIsExportExcelModalOpen] = useState<boolean>(false);
  const [isExportExcelScheduleOpen, setIsExportExceSchedulelModalOpen] = useState<boolean>(false);
  const [isScheduleToGroupModalOpen, setIsScheduleToGroupModalOpen] = useState<boolean>(false);
  const [isSendToGroupModalOpen, setIsSendToGroupModalOpen] = useState<boolean>(false);
  const [isScheduleMessageOptionsOpen, setIsScheduleMessageOptionsOpen] = useState<boolean>(false);
  const [smsCampaigns, setSmsCampaigns] = useState([]); // State to store fetched campaigns
  const [smsSchedule, setSmsSchedule] = useState([]); // State to store fetched campaigns
  const [userId, setUserId] = useState<number | null>(null);

  // Fetch the userId from async storage
  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

  // Fetch message templates from the API when userId is available
  useEffect(() => {
    if (userId) {
      const getMessageTemplates = async () => {
        const data = await fetchMessageTemplates(userId);
        setSmsCampaigns(data);
      };

      getMessageTemplates();
    }
  }, [userId]);
  useEffect(() => {
    if (userId) {
      const getScheduleMessages = async () => {
        const data = await fetchScheduleMessage(userId);
        setSmsSchedule(data); // Store fetched scheduled messages in smsSchedule state
      };
  
      getScheduleMessages();
    }
  }, [userId]);
  
 

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

  ];

  const handleMainTabClick = (tabId: 'messages' | 'scheduled' | 'international') => {
    setActiveMainTab(tabId);
  };

  const handleQuickSMSClick = () => {
    setIsSendMessageOptionsModalOpen(false);
    setIsQuickSMSModalOpen(true);
    console.log('pressed')
  };

  const handleScheduleQuickSmsClick = () => {
    setIsScheduleMessageOptionsOpen(false);
    setIsScheduleQuickSMSModalOpen(true);
  };

  const handleSendToGroupClick = () => {
    setIsSendMessageOptionsModalOpen(false);
    setIsSendToGroupModalOpen(true);
    console.log('pressed')
  };

  const handleExportExcelClick = () => {
    setIsSendMessageOptionsModalOpen(false);
   setIsExportExcelModalOpen(true);
    console.log('pressed')
  };



  const handleScheduleToGroupClick = () => {
    setIsScheduleMessageOptionsOpen(false);
    setIsScheduleToGroupModalOpen(true);
  };
  const handleExportExcelScheduleClick = () => {
    setIsScheduleMessageOptionsOpen(false);
    setIsExportExceSchedulelModalOpen(true);
  };


 
  const handleTemplateCreated = async () => {
    if (userId) {
      const data = await fetchMessageTemplates(userId);
      setSmsCampaigns(data);
    }
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
            <nav className="flex flex-wrap -mb-px">
              {mainTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 md:px-6 md:py-3 font-medium text-sm ${
                    activeMainTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => handleMainTabClick(tab.id as 'messages' | 'scheduled' | 'international')}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex flex-wrap justify-between items-center border-b border-gray-200 px-4 py-3 md:px-6">
            <div className="w-full md:w-auto mb-2 md:mb-0">
              {renderActionButtons()}
            </div>
          </div>

          <div className="p-4 md:p-6">
            {activeMainTab === 'messages' && <MessageTemplatesTable campaigns={smsCampaigns} />}
            {activeMainTab === 'scheduled' && <ScheduledMessageTable campaigns={smsSchedule} />}
            {activeMainTab === 'international' && (
              <InternationalMessagesTable messages={internationalMessages} campaigns={internationalCampaigns} />
            )}
          </div>
        </div>
      </main>
    </div>

      {/* Render the modals */}
      <CreateTemplateModal isOpen={isCreateTemplateModalOpen} onClose={() => setIsCreateTemplateModalOpen(false)} onTemplateCreated={handleTemplateCreated} />
      <SendMessageOptionsModal
        isOpen={isSendMessageOptionsModalOpen}
        onClose={() => setIsSendMessageOptionsModalOpen(false)}
        onQuickSMSClick={handleQuickSMSClick}
        onSendToGroupClick={handleSendToGroupClick}
        onExportExcel={handleExportExcelClick}
      />
      <QuickSMSModal
        isOpen={isQuickSMSModalOpen}
        onClose={() => setIsQuickSMSModalOpen(false)}
        // onNext={handleNextFromQuickSMS}
      />
      <ScheduleQuickSms
        isOpen={isScheduleQuickSMSModalOpen}
        onClose={() => setIsScheduleQuickSMSModalOpen(false)}
      />
      <SendToGroupModal
        isOpen={isSendToGroupModalOpen}
        onClose={() => setIsSendToGroupModalOpen(false)}
        // onSend={handleSendToGroup}
      />
        <ExportExcelContactStepper
        isOpen={isExportExcelOpen}
        onClose={()=>setIsExportExcelModalOpen(false)}
        // onSend={handleSendToGroup}
      />
  <ExcelUploadScheduleStepper
        isOpen={isExportExcelScheduleOpen}
        onClose={()=>setIsExportExceSchedulelModalOpen(false)}
      />

      <ScheduleToGroupStepper
        isOpen={isScheduleToGroupModalOpen}
        onClose={() => setIsScheduleToGroupModalOpen(false)}
        // onSend={handleScheduleToGroup}
      />
      
      <ScheduleMessageOptions
        isOpen={isScheduleMessageOptionsOpen}
        onClose={() => setIsScheduleMessageOptionsOpen(false)}
        onScheduleQuickSMSClick={handleScheduleQuickSmsClick}
        onScheduleToGroupClick={handleScheduleToGroupClick}
        onExportExcel={handleExportExcelScheduleClick}
      />
    </div>
  );
};

export default Dashboard;
