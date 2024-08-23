// 'use client'

// import React, { useState } from 'react';
// import Header from '@/app/Components/Header';
// import Sidebar from '@/app/Components/SideNav';
// import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';

// const Dashboard = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [currentSection, setCurrentSection] = useState('bulkSMS');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddSenderId = (newSenderId) => {
//     // Handle the new Sender ID submission here
//     console.log('New Sender ID:', newSenderId);
//     // You might want to update your state or make an API call here
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Header currentSection={currentSection} />
//       <div className="flex flex-1 pt-16">
//         <Sidebar 
//           onCollapse={setIsSidebarCollapsed} 
//           setCurrentSection={setCurrentSection}
//         />
//         <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 overflow-y-auto`}>
       
//         </main>
//       </div>
      
//       <AddSenderIdModal 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleAddSenderId}
//       />
//     </div>
//   );
// };

// export default Dashboard;