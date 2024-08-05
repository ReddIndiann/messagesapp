// components/Sidebar.js
'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FiGrid, FiMessageSquare, FiUsers, FiGift, FiCreditCard, FiFileText, FiHelpCircle, FiMail, FiPhone, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-white shadow-md transition-all duration-300 ${isCollapsed ? 'w-20 p-2' : 'w-64 p-4'}`}>
      <div className="flex justify-between items-center px-4 py-0">
        {!isCollapsed && <span className="text-lg font-bold">Logo</span>}
        <button onClick={toggleCollapse} className="focus:outline-none">
          {isCollapsed ? <FiChevronRight size={30} className="text-gray-600" /> : <FiChevronLeft size={30} className="text-gray-600" />}
        </button>
      </div>
      <nav className="space-y-1 py-4">
        <SidebarItem href="#" icon={<FiGrid />} text="Overview" active isCollapsed={isCollapsed} />
        <SidebarItem href="#" icon={<FiMessageSquare />} text="Send Message" isCollapsed={isCollapsed} />
        <SidebarItem href="#" icon={<FiUsers />} text="Contacts" isCollapsed={isCollapsed} />
        <SidebarItem href="#" icon={<FiGift />} text="Birthday App" isCollapsed={isCollapsed} />
        <SidebarItem 
          href="#" 
          icon={<FiCreditCard />} 
          text="Wallet" 
          badge={!isCollapsed && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">GHS 0.00</span>}
          isCollapsed={isCollapsed}
        />
        <SidebarItem href="#" icon={<FiFileText />} text="Campaign History" isCollapsed={isCollapsed} />
        <SidebarItem 
          href="#" 
          icon={<FiHelpCircle />} 
          text="Get Help" 
          badge={!isCollapsed && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
          isCollapsed={isCollapsed}
        />
      </nav>
      <div className={`px-0 py-4 ${isCollapsed ? 'px-0' : ''}`}>
        <h3 className={`text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-16 ${isCollapsed ? 'text-center' : ''}`}>Switch Channel</h3>
        <div className="space-y-2">
          <ChannelButton icon={<FiMail />} text="Bulk SMS" active isCollapsed={isCollapsed} />
          <ChannelButton icon={<FiPhone />} text="Bulk Voice Calls" isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ href, icon, text, badge, active, isCollapsed }) => (
  <Link href={href} className={`flex items-center space-x-3 px-6 py-3 text-base ${active ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}>
    <span className={`text-xl ${active ? 'text-green-600' : 'text-gray-400'}`}>{icon}</span>
    {!isCollapsed && <span>{text}</span>}
    {!isCollapsed && badge && <div className="ml-auto">{badge}</div>}
  </Link>
);

const ChannelButton = ({ icon, text, active, isCollapsed }) => (
  <button className={`flex items-center space-x-3 w-full px-6 py-3 text-base rounded-md ${active ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}>
    <span className={`text-xl ${active ? 'text-green-600' : 'text-gray-400'}`}>{icon}</span>
    {!isCollapsed && <span>{text}</span>}
  </button>
);

export default Sidebar;
