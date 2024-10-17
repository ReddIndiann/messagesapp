'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faAddressBook, faUsers, faCoins, faTrash, faChartBar, faBox, faCogs } from '@fortawesome/free-solid-svg-icons';
import AdminBasicBars from '@/app/Components/Graph/AdminGraph';
import { fetchSenderIds, deleteSenderId } from '@/app/lib/senderIdUtils';
import { fetchAllContacts } from '@/app/lib/contactUtil';
import { fetchAllGroups } from '@/app/lib/grouputil';
import { fetchAllUsers } from '@/app/lib/userlib';
import { fetchAllPackages } from '@/app/lib/package';
import { fetchAllCreditUsage, fetchallWallet } from '@/app/lib/package';  // Import fetchallWallet

interface User {
  id: number;
  role: 'user' | 'admin';
}

const Dashboard: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'Developer' | 'admin'>('bulkSMS');
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [senderIds, setSenderIds] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [contactCount, setContactCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [groupCount, setGroupCount] = useState<number>(0);
  const [packagesCount, setPackagesCount] = useState<number>(0);
  const [usageCount, setUsageCount] = useState<number>(0);

  const [totalAmount, setTotalAmount] = useState<number>(0); // New state for total amount

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
      if (extractedUserId) {
        fetchSenderIds(extractedUserId)
          .then(data => setSenderIds(data))
          .catch(err => setError('Error fetching sender IDs: ' + err.message));

        fetchAllContacts()
          .then(data => setContactCount(data.length))
          .catch(err => setError('Error fetching contacts: ' + err.message));

        fetchAllPackages()
          .then(data => setPackagesCount(data.length))
          .catch(err => setError('Error fetching packages: ' + err.message));

        fetchAllCreditUsage()
          .then(data => setUsageCount(data.length))
          .catch(err => setError('Error fetching usage order: ' + err.message));

        fetchAllUsers()
          .then((data: User[]) => {
            const users = data.filter(user => user.role === 'user');
            const admins = data.filter(user => user.role === 'admin');
            setUserCount(users.length);
            setAdminCount(admins.length);
          })
          .catch(err => setError('Error fetching users: ' + err.message));

        fetchAllGroups()
          .then(data => setGroupCount(data.length))
          .catch(err => setError('Error fetching groups: ' + err.message));

        // Fetch total amount from the wallet API
        fetchallWallet()
          .then(amount => setTotalAmount(amount))  // Set the total amount
          .catch(err => setError('Error fetching total amount: ' + err.message));
      }
    }
  }, []);

  const handleSuccess = () => {
    if (userId) {
      fetchSenderIds(userId)
        .then(data => setSenderIds(data))
        .catch(err => setError('Error fetching sender IDs: ' + err.message));

      fetchAllGroups()
        .then(data => setGroupCount(data.length))
        .catch(err => setError('Error fetching groups: ' + err.message));

      fetchAllContacts()
        .then(data => setContactCount(data.length))
        .catch(err => setError('Error fetching contacts: ' + err.message));

      fetchAllCreditUsage()
        .then(data => setUsageCount(data.length))
        .catch(err => setError('Error fetching usage order: ' + err.message));

      fetchAllPackages()
        .then(data => setPackagesCount(data.length))
        .catch(err => setError('Error fetching packages: ' + err.message));

      fetchAllUsers()
        .then((data: User[]) => {
          const users = data.filter(user => user.role === 'user');
          const admins = data.filter(user => user.role === 'admin');
          setUserCount(users.length);
          setAdminCount(admins.length);
        })
        .catch(err => setError('Error fetching users: ' + err.message));

      // Fetch the total amount again after a success action
      fetchallWallet()
        .then(amount => setTotalAmount(amount))
        .catch(err => setError('Error fetching total amount: ' + err.message));
    }
  };

  

  // Function to navigate to a specific page
  const handleCardClick = (page: string) => {
    router.push(`/dashboard/${page}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar onCollapse={setIsSidebarCollapsed} setCurrentSection={setCurrentSection} />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 overflow-y-auto`}>
          <div className="max-w-7xl mx-auto">
            <p className="text-red-500 text-sm mb-6">Overview page displays data from the past Month.</p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[
                { value: userCount + adminCount, label: 'All Users', icon: faUsers, color: 'bg-blue-500', page: '' },
                { value: userCount, label: 'Users', icon: faAddressBook, color: 'bg-green-500', page: '' },
                { value: adminCount, label: 'Admins', icon: faCogs, color: 'bg-yellow-500', page: '' },
                { value: contactCount, label: 'All Contacts', icon: faAddressBook, color: 'bg-green-500', page: '' },
                { value: groupCount, label: 'All Groups', icon: faChartBar, color: 'bg-purple-500', page: '' },
                { value: packagesCount, label: 'Packages', icon: faBox, color: 'bg-blue-500', page: '' },
                { value: usageCount, label: 'Credit Order', icon: faCoins, color: 'bg-yellow-500', page: '' },
                { value: `GHS ${totalAmount}`, label: 'Amount Accumulated', icon: faCoins, color: 'bg-orange-500', page: 'credits' }, 
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center bg-white shadow-lg rounded-lg p-6 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(item.page)} // Add onClick event
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} text-white`}>
                    <FontAwesomeIcon icon={item.icon} size="lg" />
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-semibold text-gray-700">{item.value}</div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
              <motion.div
                className="bg-white shadow rounded-lg p-6 flex-grow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-600">Billing Summary</h3>
                <AdminBasicBars />
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      <AddSenderIdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Dashboard;
