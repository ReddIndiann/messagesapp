// 'use client'
// import React, { useState } from 'react';
// import Header from '@/app/Components/Header';
// import Sidebar from '@/app/Components/SideNav';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import CreateTemplateModal from '@/app/Components/Modals/CreateTemplateModal';
// import SendMessageOptionsModal from '@/app/Components/Modals/SendMessageOptionsModal';
// import QuickSMSModal from '@/app/Components/Modals/SendQuicksms';
// import DetailedMessageModal from '@/app/Components/Modals/SendMessageModal';
// import MessageTemplatesTable from '@/app/Components/Tables/MessageTemplateTable';
// import ScheduledMessageTable from '@/app/Components/Tables/ScheduledMessageTable'; // Updated import for the new table
// import SendToGroupModal from '@/app/Components/Modals/SendToGroupModal';
// import SendMessageToGroup from '@/app/Components/Modals/SendMessageToGroup';
// import ConfirmationMessageModal from '@/app/Components/Modals/ConfirmationModal';
// import InternationalMessagesTable from '@/app/Components/Tables/InternationalMessagesTable';

// const Dashboard = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [currentSection, setCurrentSection] = useState('bulkSMS');
//   const [activeTab, setActiveTab] = useState('createMessageTemplates');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
//   const [isQuickSMSModalOpen, setIsQuickSMSModalOpen] = useState(false);
//   const [isDetailedMessageModalOpen, setIsDetailedMessageModalOpen] = useState(false);
//   const [isSendToGroupModalOpen, setIsSendToGroupModalOpen] = useState(false);
//   const [isSendMessageToGroupOpen, setIsSendMessageToGroupOpen] = useState(false);
//   const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

//   const [selectedSenderID, setSelectedSenderID] = useState('');
//   const [campaignTitle, setCampaignTitle] = useState('');
//   const [messageContent, setMessageContent] = useState('');

//   const smsCampaigns = [
//     { id: 1, title: 'FriendsList', content: 'This is it bros', type: 'SMS', date: 'Fri 2 Aug, 2024 2:12:22 pm' },
//     // More campaigns...
//   ];

//   const scheduledMessages = [
//     { id: 1, title: 'Meeting Reminder', content: "Don't forget our meeting at 3 PM.", type: 'Scheduled', scheduled: 'Fri 2 Aug, 2024 1:12:22 pm', lastseen: 'Fri 2 Aug, 2024 1:12:22 pm', recipient: 'John Doe', status: 'COMPLETE', repeatperiod: 'None' },
//     // More scheduled messages...
//   ];

//   const internationalMessages = [
//     { country: 'USA', code: '+1', internationalRate: '0.10', localRate: '0.05' },
//     { country: 'Canada', code: '+1', internationalRate: '0.09', localRate: '0.04' },
//     // More international messages...
//   ];

//   const internationalCampaigns = [
//     { title: 'Holiday Promo', content: 'Enjoy our holiday discounts!', countries: ['USA', 'Canada'], status: 'Active' },
//     // More international campaigns...
//   ];

//   const handleQuickSMSNext = () => {
//     setIsQuickSMSModalOpen(false);
//     setIsDetailedMessageModalOpen(true);
//   };

//   const handleDetailedMessageNext = () => {
//     setIsDetailedMessageModalOpen(false);
//     setIsConfirmationModalOpen(true);
//   };

//   const handleSendToGroup = () => {
//     setIsSendToGroupModalOpen(false);
//     setIsSendMessageToGroupOpen(true);
//   };

//   const handleSendMessages = async ({ selectedSenderID, campaignTitle, messageContent }) => {
//     // Implement the actual send logic here
//     // This could involve an API call to your backend server

//     // For now, just simulate a delay
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(), 2000);
//     });
//   };

//   return (
//     <div className={`min-h-screen bg-gray-100 flex flex-col ${isModalOpen || isSendMessageModalOpen || isQuickSMSModalOpen || isDetailedMessageModalOpen || isSendToGroupModalOpen || isSendMessageToGroupOpen || isConfirmationModalOpen ? 'overflow-hidden' : ''}`}>
//       <Header currentSection={currentSection} />
//       <div className="flex flex-1 pt-16">
//         <Sidebar onCollapse={setIsSidebarCollapsed} setCurrentSection={setCurrentSection} />
//         <main className={`flex-1 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} p-4 md:p-6 lg:p-8 overflow-y-auto ${isModalOpen || isSendMessageModalOpen || isQuickSMSModalOpen || isDetailedMessageModalOpen || isSendToGroupModalOpen || isSendMessageToGroupOpen || isConfirmationModalOpen ? 'blur' : ''}`}>
//           <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
//             <div className="flex flex-col md:flex-row justify-between items-center mb-6 text-sm md:text-base border border-gray-300 p-3 md:p-4 rounded-lg">
//               <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
//                 <button 
//                   className={`px-3 py-2 rounded-xl text-sm border ${activeTab === 'createMessageTemplates' ? 'bg-gray-100 text-orange-600 border-orange-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
//                   onClick={() => setActiveTab('createMessageTemplates')}
//                 >
//                   Create Templates
//                 </button>
//                 <button 
//                   className={`px-3 py-2 rounded-xl text-sm border ${activeTab === 'scheduledMessages' ? 'bg-gray-100 text-orange-600 border-orange-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
//                   onClick={() => setActiveTab('scheduledMessages')}
//                 >
//                   Scheduled Messages
//                 </button>
//                 <button 
//                   className={`px-3 py-2 rounded-xl text-sm border ${activeTab === 'internationalMessages' ? 'bg-gray-100 text-orange-600 border-orange-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
//                   onClick={() => setActiveTab('internationalMessages')}
//                 >
//                   International Messages
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {activeTab === 'createMessageTemplates' && (
//                   <>
//                     <button 
//                       className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm"
//                       onClick={() => setIsModalOpen(true)}
//                     >
//                       <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
//                       Create Template
//                     </button>
//                     <button 
//                       className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm"
//                       onClick={() => setIsSendMessageModalOpen(true)}
//                     >
//                       <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
//                       Send Message
//                     </button>
//                   </>
//                 )}
//                 {activeTab === 'sendMessage' && (
//                   <button 
//                     className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm"
//                     onClick={() => setIsSendMessageModalOpen(true)}
//                   >
//                     <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
//                     Send Message
//                   </button>
//                 )}
//                 {activeTab === 'scheduledMessages' && (
//                   <button 
//                     className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm"
//                     onClick={() => setIsSendMessageModalOpen(true)}
//                   >
//                     Schedule Message
//                   </button>
//                 )}
//                 {activeTab === 'internationalMessages' && (
//                   <button 
//                     className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm"
//                     onClick={() => setIsQuickSMSModalOpen(true)}
//                   >
//                     Create New Template
//                   </button>
//                 )}
//               </div>
//             </div>

//             {activeTab === 'createMessageTemplates' && <MessageTemplatesTable campaigns={smsCampaigns} />}
//             {activeTab === 'sendMessage' && <MessageTemplatesTable campaigns={smsCampaigns} />}
//             {activeTab === 'scheduledMessages' && <ScheduledMessageTable campaigns={scheduledMessages} />} {/* Replaced with new table */}
//             {activeTab === 'internationalMessages' && <InternationalMessagesTable messages={internationalMessages} campaigns={internationalCampaigns} />}
//           </div>
//         </main>
//       </div>

//       {isModalOpen && <CreateTemplateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
//       {isSendMessageModalOpen && <SendMessageOptionsModal isOpen={isSendMessageModalOpen} onClose={() => setIsSendMessageModalOpen(false)} onQuickSMSClick={() => setIsQuickSMSModalOpen(true)} onSendToGroupClick={() => setIsSendToGroupModalOpen(true)} />}
//       {isQuickSMSModalOpen && <QuickSMSModal isOpen={isQuickSMSModalOpen} onClose={() => setIsQuickSMSModalOpen(false)} onNext={handleQuickSMSNext} />}
//       {isDetailedMessageModalOpen && <DetailedMessageModal isOpen={isDetailedMessageModalOpen} onClose={() => setIsDetailedMessageModalOpen(false)} onNext={handleDetailedMessageNext} />}
//       {isSendToGroupModalOpen && <SendToGroupModal isOpen={isSendToGroupModalOpen} onClose={() => setIsSendToGroupModalOpen(false)} onSend={handleSendToGroup} />}
//       {isSendMessageToGroupOpen && <SendMessageToGroup isOpen={isSendMessageToGroupOpen} onClose={() => setIsSendMessageToGroupOpen(false)} onSend={handleSendMessages} />}
//       {isConfirmationModalOpen && <ConfirmationMessageModal isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)} senderID={selectedSenderID} campaignTitle={campaignTitle} messageContent={messageContent} />}
//     </div>
//   );
// };

// export default Dashboard;


'use client'
import React, { useState } from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';
import MessageTemplatesTable from '@/app/Components/Tables/MessageTemplateTable';
import ScheduledMessageTable from '@/app/Components/Tables/ScheduledMessageTable';
import InternationalMessagesTable from '@/app/Components/Tables/InternationalMessagesTable';
import CreateTemplateModal from '@/app/Components/Modals/CreateTemplateModal'; // Import the CreateTemplateModal
import SendMessageOptionsModal from '@/app/Components/Modals/SendMessageOptionsModal';// Import the SendMessageOptionsModal
import QuickSMSModal from '@/app/Components/Modals/SendQuicksms';// Import the QuickSMSModal

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('bulkSMS');
  const [activeMainTab, setActiveMainTab] = useState('messages');
  const [isCreateTemplateModalOpen, setIsCreateTemplateModalOpen] = useState(false); // State for CreateTemplateModal
  const [isSendMessageOptionsModalOpen, setIsSendMessageOptionsModalOpen] = useState(false); // State for SendMessageOptionsModal
  const [isQuickSMSModalOpen, setIsQuickSMSModalOpen] = useState(false); // State for QuickSMSModal

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

  const handleMainTabClick = (tabId) => {
    setActiveMainTab(tabId);
  };

  const handleQuickSMSClick = () => {
    setIsSendMessageOptionsModalOpen(false); // Close the SendMessageOptionsModal
    setIsQuickSMSModalOpen(true); // Open the QuickSMSModal
  };

  const handleNextFromQuickSMS = () => {
    setIsQuickSMSModalOpen(false); // Optionally, you can manage navigation here if needed
    // Handle any logic needed after "Next" button is clicked
  };

  const renderActionButtons = () => {
    if (activeMainTab === 'messages') {
      return (
        <div className="flex space-x-4">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition duration-300"
            onClick={() => setIsCreateTemplateModalOpen(true)} // Open CreateTemplateModal
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Template
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition duration-300"
            onClick={() => setIsSendMessageOptionsModalOpen(true)} // Open SendMessageOptionsModal
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Send Message
          </button>
        </div>
      );
    } else if (activeMainTab === 'scheduled') {
      return (
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition duration-300">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Schedule Message
        </button>
      );
    } else if (activeMainTab === 'international') {
      return (
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition duration-300">
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
                    className={`px-6 py-3 font-medium text-sm ${activeMainTab === tab.id ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleMainTabClick(tab.id)}
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
        onQuickSMSClick={handleQuickSMSClick} // Open QuickSMSModal
        onSendToGroupClick={() => console.log('Send to Group clicked')} // Implement your functionality
      />
      <QuickSMSModal
        isOpen={isQuickSMSModalOpen}
        onClose={() => setIsQuickSMSModalOpen(false)}
        onNext={handleNextFromQuickSMS} // Handle logic for "Next" button
      />
    </div>
  );
};

export default Dashboard;
