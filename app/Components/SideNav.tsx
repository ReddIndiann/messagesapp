'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiGrid, FiMessageSquare, FiUsers, FiGift, FiCreditCard, FiFileText, FiHelpCircle, FiMail, FiPhone, FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';

// Define types for SidebarProps
interface SidebarProps {
  onCollapse: (isCollapsed: boolean) => void;
  setCurrentSection: (section: 'bulkSMS' | 'voiceCalls') => void;
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  badge?: React.ReactNode;
  active: boolean;
  isCollapsed: boolean;
}

interface ChannelButtonProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse, setCurrentSection }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedState = Cookies.get('sidebar-collapsed');
      return storedState === 'true';
    }
    return false;
  });
  const [activeChannel, setActiveChannel] = useState<'bulkSMS' | 'voiceCalls'>(() => {
    const path = window.location.pathname;
    return path.includes('Sms') ? 'bulkSMS' : 'voiceCalls';
  });
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Cookies.set('sidebar-collapsed', JSON.stringify(isCollapsed));
    }
    onCollapse(isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    // Update active channel based on the current path
    if (pathname.includes('Sms')) {
      setActiveChannel('bulkSMS');
    } else if (pathname.includes('Voice')) {
      setActiveChannel('voiceCalls');
    }
  }, [pathname]);

  useEffect(() => {
    // Ensure the current section is updated whenever activeChannel changes
    setCurrentSection(activeChannel);
  }, [activeChannel, setCurrentSection]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleChannelSwitch = (channel: 'bulkSMS' | 'voiceCalls') => {
    if (activeChannel === channel) return; // Avoid unnecessary state update

    setActiveChannel(channel);

    if (channel === 'bulkSMS') {
      router.push('/Sms/SendMessage');
    } else if (channel === 'voiceCalls') {
      router.push('/Voice/Sendcall');
    }
  };

  const isActive = (path: string) => pathname === path;

  const smsNavItems = [
    { href: "/Sms/Home", icon: <FiGrid />, text: "Overview" },
    { href: "/Sms/SendMessage", icon: <FiMessageSquare />, text: "Send Message" },
    { href: "/Sms/Contacts", icon: <FiUsers />, text: "Contacts" },
    { href: "/Sms/BirthdayApp", icon: <FiGift />, text: "Birthday App" },
    { href: "/Sms/Wallet", icon: <FiCreditCard />, text: "Wallet", badge: <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">GHS 0.00</span> },
    { href: "/Sms/CampaignHistory", icon: <FiFileText />, text: "Campaign History" },
    { href: "/Sms/GetHelp", icon: <FiHelpCircle />, text: "Get Help", badge: <span className="w-2 h-2 bg-orange-500 rounded-full"></span> },
  ];

  const voiceNavItems = [
    { href: "/Voice/VoiceHome", icon: <FiGrid />, text: " Overview" },
    { href: "/Voice/Sendcall", icon: <FiPhone />, text: " Send Voice " },
    { href: "/Voice/VoiceContacts", icon: <FiUsers />, text: " Contacts" },
    { href: "/Voice/VoiceTemplates", icon: <FiGift />, text: " Birthday App" },
    { href: "/Voice/VoiceWallet", icon: <FiCreditCard />, text: " Wallet", badge: <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">GHS 0.00</span> },
    { href: "/Voice/VoiceHistory", icon: <FiClock />, text: "Campaign  History" },
    { href: "/Voice/VoiceHelp", icon: <FiHelpCircle />, text: " Help", badge: <span className="w-2 h-2 bg-orange-500 rounded-full"></span> },
  ];
  
  const currentNavItems = activeChannel === 'bulkSMS' ? smsNavItems : voiceNavItems;

  return (
    <div className={`bg-white shadow-md transition-all duration-300 fixed top-16 left-0 bottom-0 overflow-y-auto ${isCollapsed ? 'w-20 p-2' : 'w-64 p-4'}`}>
      <div className="flex justify-between items-center px-4 py-2">
        {!isCollapsed && <span className="text-lg font-bold">Logo</span>}
        <button onClick={toggleCollapse} className="focus:outline-none">
          {isCollapsed ? <FiChevronRight size={24} className="text-gray-600" /> : <FiChevronLeft size={24} className="text-gray-600" />}
        </button>
      </div>
      <nav className="space-y-1 py-4">
        {currentNavItems.map((item, index) => (
          <SidebarItem
            key={index}
            href={item.href}
            icon={item.icon}
            text={item.text}
            active={isActive(item.href)}
            isCollapsed={isCollapsed}
            badge={item.badge}
          />
        ))}
      </nav>
      <div className={`px-4 py-12 ${isCollapsed ? 'px-2' : ''}`}>
        <h3 className={`text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-xs text-center ' : ''}`}>
          {/* Switch Channel */}TABS
        </h3>
        <div className="space-y-2">
          <ChannelButton 
            icon={<FiMail />} 
            text="Bulk SMS" 
            active={activeChannel === 'bulkSMS'} 
            isCollapsed={isCollapsed} 
            onClick={() => handleChannelSwitch('bulkSMS')}
          />
          <ChannelButton 
            icon={<FiPhone />} 
            text="Bulk Voice Calls" 
            active={activeChannel === 'voiceCalls'} 
            isCollapsed={isCollapsed} 
            onClick={() => handleChannelSwitch('voiceCalls')}
          />
        </div>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, text, badge, active, isCollapsed }) => (
  <Link href={href} className={`flex items-center space-x-3 px-4 py-2 text-sm ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
    <span className={`text-xl ${active ? 'text-blue-600' : 'text-gray-400'}`}>{icon}</span>
    {!isCollapsed && <span>{text}</span>}
    {!isCollapsed && badge && <div className="ml-auto">{badge}</div>}
  </Link>
);

const ChannelButton: React.FC<ChannelButtonProps> = ({ icon, text, active, isCollapsed, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center space-x-3 w-full px-2 py-2 text-sm rounded-md ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
  >
    <span className={`text-xl ${active ? 'text-blue-600' : 'text-gray-400'}`}>{icon}</span>
    {!isCollapsed && <span>{text}</span>}
  </button>
);

export default Sidebar;
