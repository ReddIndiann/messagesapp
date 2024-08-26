import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiGrid, FiMessageSquare, FiUsers, FiGift, FiCreditCard, FiFileText, FiHelpCircle,FiSettings,FiClock,
  FiMail, FiPhone, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

interface SidebarProps {
  onCollapse: (isCollapsed: boolean) => void;
  setCurrentSection: (section: 'bulkSMS' | 'voiceCalls' | 'admin') => void;
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
      const storedState = localStorage.getItem('sidebar-collapsed');
      return storedState === 'true';
    }
    return false;
  });

  const [activeChannel, setActiveChannel] = useState<'bulkSMS' | 'voiceCalls' | 'admin'>('bulkSMS');
  const [userRole, setUserRole] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const signInResponse = localStorage.getItem('signInResponse');
      if (signInResponse) {
        const parsedResponse = JSON.parse(signInResponse);
        const role = parsedResponse.user?.role || null;
        setUserRole(role);

        // If user is not an admin, redirect from admin pages to SMS section
        if (role !== 'admin' && pathname.includes('/Admin')) {
          router.push('/Sms/SendMessage');
          setActiveChannel('bulkSMS');
        }
      }

      const path = window.location.pathname;
      if (path.includes('Sms')) setActiveChannel('bulkSMS');
      else if (path.includes('Voice')) setActiveChannel('voiceCalls');
      else if (path.includes('Admin')) setActiveChannel('admin');
    }
  }, [pathname, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    }
    onCollapse(isCollapsed);
  }, [isCollapsed, onCollapse]);

  useEffect(() => {
    setCurrentSection(activeChannel);
  }, [activeChannel, setCurrentSection]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleChannelSwitch = (channel: 'bulkSMS' | 'voiceCalls' | 'admin') => {
    if (activeChannel === channel) return;

    if (channel === 'admin' && userRole !== 'admin') {
      // Prevent non-admin users from accessing admin section
      return;
    }

    setActiveChannel(channel);

    if (channel === 'bulkSMS') {
      router.push('/Sms/SendMessage');
    } else if (channel === 'voiceCalls') {
      router.push('/Voice/Sendcall');
    } else if (channel === 'admin') {
      router.push('/Admin/Dashboard');
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
    { href: "/Voice/VoiceHome", icon: <FiGrid />, text: "Overview" },
    { href: "/Voice/Sendcall", icon: <FiPhone />, text: "Send Voice" },
    { href: "/Voice/VoiceContacts", icon: <FiUsers />, text: "Contacts" },
    { href: "/Voice/VoiceTemplates", icon: <FiGift />, text: "Birthday App" },
    { href: "/Voice/VoiceWallet", icon: <FiCreditCard />, text: "Wallet", badge: <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">GHS 0.00</span> },
    { href: "/Voice/VoiceHistory", icon: <FiClock />, text: "Campaign History" },
    { href: "/Voice/VoiceHelp", icon: <FiHelpCircle />, text: "Help", badge: <span className="w-2 h-2 bg-orange-500 rounded-full"></span> },
  ];
  const adminNavItems = [
    { href: "/Admin/Dashboard", icon: <FiGrid />, text: "Dashboard" },
    { href: "/Admin/ManageUsers", icon: <FiUsers />, text: "Manage Users" },
    { href: "/Admin/SenderIds", icon: <FiSettings />, text: "SenderIds" },
    { href: "/Admin/Reports", icon: <FiFileText />, text: "Reports" },
    { href: "/Admin/Help", icon: <FiHelpCircle />, text: "Help" },
  ];
  
  const currentNavItems = activeChannel === 'bulkSMS' ? smsNavItems
  : activeChannel === 'voiceCalls' ? voiceNavItems
  : adminNavItems;

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
            // badge={item.badge}
          />
        ))}
      </nav>
      <div className={`px-4 py-12 ${isCollapsed ? 'px-2' : ''}`}>
        <h3 className={`text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-xs text-center ' : ''}`}>
          TABS
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
          {userRole === 'admin' && (
            <ChannelButton 
              icon={<FiSettings />} 
              text="Admin" 
              active={activeChannel === 'admin'} 
              isCollapsed={isCollapsed} 
              onClick={() => handleChannelSwitch('admin')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, text, badge, active, isCollapsed }) => (
  <Link href={href} className={`flex items-center space-x-3 px-4 py-2 text-sm ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
    <span className={`text-xl ${active ? 'text-blue-600' : 'text-gray-500'}`}>{icon}</span>
    {!isCollapsed && <span className="flex-grow">{text}</span>}
    {!isCollapsed && badge}
  </Link>
);

const ChannelButton: React.FC<ChannelButtonProps> = ({ icon, text, active, isCollapsed, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-2 text-sm ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'} w-full focus:outline-none`}
  >
    <span className={`text-xl ${active ? 'text-blue-600' : 'text-gray-500'}`}>{icon}</span>
    {!isCollapsed && <span className="flex-grow">{text}</span>}
  </button>
);
export default Sidebar;
