// components/Sidebar.js
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiMessageSquare, FiUsers, FiGift, FiCreditCard, FiFileText, FiHelpCircle, FiMail, FiPhone, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Sidebar = ({ onCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('sidebar-collapsed');
      return storedState === 'true';
    }
    return false;
  });
  const [activeChannel, setActiveChannel] = useState('bulkSMS');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    }
    onCollapse(isCollapsed);
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => pathname === path;

  return (
    <div className={`bg-white shadow-md transition-all duration-300 fixed top-16 left-0 bottom-0 overflow-y-auto ${isCollapsed ? 'w-20 p-2' : 'w-64 p-4'}`}>
      <div className="flex justify-between items-center px-4 py-2">
        {!isCollapsed && <span className="text-lg font-bold">Logo</span>}
        <button onClick={toggleCollapse} className="focus:outline-none">
          {isCollapsed ? <FiChevronRight size={24} className="text-gray-600" /> : <FiChevronLeft size={24} className="text-gray-600" />}
        </button>
      </div>
      <nav className="space-y-1 py-4">
        <SidebarItem href="/Main/Home" icon={<FiGrid />} text="Overview" active={isActive('/Main/Home')} isCollapsed={isCollapsed} />
        <SidebarItem 
          href={activeChannel === 'bulkSMS' ? "/Main/SendMessage" : "/Main/SendVoice"} 
          icon={<FiMessageSquare />} 
          text={activeChannel === 'bulkSMS' ? "Send Message" : "Send Voice"} 
          active={isActive(activeChannel === 'bulkSMS' ? '/Main/SendMessage' : '/Main/SendVoice')} 
          isCollapsed={isCollapsed} 
        />
        <SidebarItem href="/Main/Contacts" icon={<FiUsers />} text="Contacts" active={isActive('/Main/Contacts')} isCollapsed={isCollapsed} />
        <SidebarItem href="/Main/BirthdayApp" icon={<FiGift />} text="Birthday App" active={isActive('/Main/BirthdayApp')} isCollapsed={isCollapsed} />
        <SidebarItem 
          href="/Main/Wallet" 
          icon={<FiCreditCard />} 
          text="Wallet" 
          active={isActive('/Main/Wallet')} 
          badge={!isCollapsed && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">GHS 0.00</span>}
          isCollapsed={isCollapsed}
        />
        <SidebarItem href="/Main/CampaignHistory" icon={<FiFileText />} text="Campaign History" active={isActive('/Main/CampaignHistory')} isCollapsed={isCollapsed} />
        <SidebarItem 
          href="/Main/GetHelp" 
          icon={<FiHelpCircle />} 
          text="Get Help" 
          active={isActive('/Main/GetHelp')} 
          badge={!isCollapsed && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
          isCollapsed={isCollapsed}
        />
      </nav>
      <div className={`px-4 py-12 ${isCollapsed ? 'px-2' : ''}`}>
        <h3 className={`text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-xs text-center ' : ''}`}>
          Switch Channel
        </h3>
        <div className="space-y-2">
          <ChannelButton 
            icon={<FiMail />} 
            text="Bulk SMS" 
            active={activeChannel === 'bulkSMS'} 
            isCollapsed={isCollapsed} 
            onClick={() => setActiveChannel('bulkSMS')} 
          />
          <ChannelButton 
            icon={<FiPhone />} 
            text="Bulk Voice Calls" 
            active={activeChannel === 'voiceCalls'} 
            isCollapsed={isCollapsed} 
            onClick={() => setActiveChannel('voiceCalls')} 
          />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ href, icon, text, badge, active, isCollapsed }) => (
  <Link href={href} className={`flex items-center space-x-3 px-4 py-2 text-sm ${active ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}>
    <span className={`text-xl ${active ? 'text-green-600' : 'text-gray-400'}`}>{icon}</span>
    {!isCollapsed && <span>{text}</span>}
    {!isCollapsed && badge && <div className="ml-auto">{badge}</div>}
  </Link>
);

const ChannelButton = ({ icon, text, active, isCollapsed, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center space-x-3 w-full px-2 py-2 text-sm rounded-md ${active ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
  >
    <span className={`text-xl ${active ? 'text-green-600' : 'text-gray-400'}`}>{icon}</span>
    {!isCollapsed && <span>{text}</span>}
  </button>
);

export default Sidebar; 
