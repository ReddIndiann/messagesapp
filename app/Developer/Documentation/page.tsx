'use client';

import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Header from '@/app/Components/Header';
// import Sidebar from '@/app/Components/SideNav';
// import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
// import TableComponent from '@/app/Components/Tables/ApiKeyTable';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHistory, faPlus } from '@fortawesome/free-solid-svg-icons';
// import { useRouter } from 'next/navigation';
interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-50'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const Dashboard = () => {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
//   const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'voiceCalls' | 'admin'>('bulkSMS');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [currentTabSection, setCurrentTabSection] = useState<'API.V.1' | 'API.V.2'>('API.V.1'); // Default to 'pending'
// const router = useRouter();
//   useEffect(() => {
//     const signInResponse = localStorage.getItem('signInResponse');
//     if (signInResponse) {
//       const parsedResponse = JSON.parse(signInResponse);
//       const extractedUserId = parsedResponse.user?.id || null;
//       setUserId(extractedUserId);
//     }
//   }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     <h1  className='text-9xl text-center justify-center  text-black hover:text-sky-500'> DOCUMENTATION PAGE</h1>
    </div>
  );
};

export default Dashboard;
