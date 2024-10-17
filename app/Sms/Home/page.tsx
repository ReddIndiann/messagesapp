'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import AddSenderIdModal from '@/app/Components/Modals/SenderIdModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faAddressBook, faUsers, faCoins, faTrash } from '@fortawesome/free-solid-svg-icons';
import BasicBars from '@/app/Components/Graph/Graph';
import { fetchSenderIds, deleteSenderId } from '@/app/lib/senderIdUtils';
import { fetchGraph } from '@/app/lib/sendmessageUtil';
import { fetchContacts } from '@/app/lib/contactUtil';
import { fetchGroups } from '@/app/lib/grouputil';
import { fetchList } from '@/app/lib/sendmessageUtil';
import { fetchScheduleList } from '@/app/lib/sendmessageUtil';
import { fetchSendList } from '@/app/lib/sendmessageUtil';


import Swal from 'sweetalert2'; 
const Dashboard: React.FC = () => {
  const router = useRouter(); 
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'Developer' | 'admin'>('bulkSMS');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [senderIds, setSenderIds] = useState<any[]>([]); 
  const [contactCount, setContactCount] = useState<number>(0); 
  const [groupCount, setGroupCount] = useState<number>(0); 
  const [creditCount, setCreditCount] = useState<number>(0); 
  const [sendCount, setSendCount] = useState<number>(0); 
  const [scheduledCount, SetScheduledCount] = useState<number>(0); 
  const [campaignCount, setCampaignCount] = useState<number>(0); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
      console.log(`logger ${extractedUserId}`)
      if (extractedUserId) {
        fetchSenderIds(extractedUserId)
          .then(data => setSenderIds(data))
          .catch(err => setError('Error fetching sender IDs: ' + err.message));
    
        fetchContacts(extractedUserId)
          .then(data => setContactCount(data.length))
          .catch(err => setError('Error fetching contacts: ' + err.message));
    
        fetchList(extractedUserId)
          .then(data => setCreditCount(data.length))
          .catch(err => setError('Error fetching credits: ' + err.message));
    
        fetchGroups(extractedUserId)
          .then(data => setGroupCount(data.length))
          .catch(err => setError('Error fetching groups: ' + err.message));
    
          fetchScheduleList(extractedUserId)
          .then(data => SetScheduledCount(data.length))
          .catch(err => setError('Error fetching credits: ' + err.message));
        
          fetchSendList(extractedUserId)
          .then(data => setSendCount(data.length))
          .catch(err => setError('Error fetching credits: ' + err.message));
        
        // Fetch Graph data
        fetchGraph(extractedUserId)
          .then(data => {
            console.log("Graph Data:", data); // Log the fetched data
            // Assuming the structure is correct and it has the needed properties
            setCampaignCount(data || 0); // Use a fallback if undefined
          })
          .catch(err => setError('Error fetching campaign data: ' + err.message));
      }
    }
  }, []);
  console.log(`log ${userId}`)
  
  const handleSuccess = () => {
    if (userId) {
      fetchSenderIds(userId)
        .then(data => setSenderIds(data))
        .catch(err => setError('Error fetching sender IDs: ' + err.message));
      fetchGroups(userId)
        .then(data => setGroupCount(data.length))
        .catch(err => setError('Error fetching groups: ' + err.message));
      fetchContacts(userId)
        .then(data => setContactCount(data.length))
        .catch(err => setError('Error fetching contacts: ' + err.message));
      fetchList(userId)
        .then(data => setCreditCount(data.length))
        .catch(err => setError('Error fetching credits: ' + err.message));
      
        fetchScheduleList(userId)
        .then(data => SetScheduledCount(data.length))
        .catch(err => setError('Error fetching credits: ' + err.message));
      
        fetchSendList(userId)
        .then(data => setSendCount(data.length))
        .catch(err => setError('Error fetching credits: ' + err.message));
      
      // Fetch Graph data again
      fetchGraph(userId)
        .then(data => {
          setCampaignCount(data || 0); // Use a fallback if undefined
        })
        .catch(err => setError('Error fetching campaign data: ' + err.message));
    }
  };
  

  const handleDelete = async (senderId: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteSenderId(senderId);
        setSenderIds(senderIds.filter(sender => sender.id !== senderId));
        Swal.fire(
          'Deleted!',
          'Your group has been deleted.',
          'success'
        );
      } catch (err: any) {
        console.error('Error deleting group: ' + err.message);
        Swal.fire({
          icon: 'error',
          title: ' Failed',
          text: err.message || 'Failed to Delete. Please try again.',
        });
      }
    }
  };

  // Function to navigate to a specific page
  const handleCardClick = (page: string) => {
    router.push(`/Sms/${page}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar onCollapse={setIsSidebarCollapsed} setCurrentSection={setCurrentSection} />
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 overflow-y-auto`}>
          <div className="max-w-7xl mx-auto">
            {/* <p className="text-red-500 text-sm mb-6">Overview page displays data from the past 3 days.</p> */}

           

<motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {[
    { value: sendCount + scheduledCount, label: 'Campaigns', icon: faBullhorn, color: 'bg-blue-500', page: 'CampaignHistory' },
    { value: contactCount, label: 'Contacts', icon: faAddressBook, color: 'bg-green-500', page: 'Contacts' }, 
    { value: groupCount, label: 'Groups', icon: faUsers, color: 'bg-yellow-500', page: 'Contacts' },
    { value: creditCount, label: 'Credit Used', icon: faCoins, color: 'bg-orange-500', page: 'Wallet' },
  ].map((item, index) => (
    <motion.div
      key={index}
      className="flex items-center bg-white shadow-lg rounded-lg p-6 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleCardClick(item.page)}
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
                 {/* Conditionally render the BasicBars component if userId is not null */}
        {userId ? (
          <BasicBars  />
        ) : (
          <p>Loading user data...</p> // You can show a loader or fallback content here
        )}
              </motion.div>

              <motion.div
                className="bg-white shadow rounded-lg p-6 w-full lg:w-72 h-96 lg:flex-shrink-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-normal text-gray-500">Sender ID</h3>
                  <button
                    className="bg-blue-400 text-white px-3 py-1 rounded-md text-sm font-medium"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Sender ID
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  {senderIds.map((sender, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-slate-600">{sender.name}</span>
                      <div className="flex items-center space-x-24">
                        <div
                          className={`rounded-full p-1 ${
                            sender.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                          } text-white`}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <button
                          title='id'
                          className="text-gray-400 hover:text-red-500 transition duration-200"
                          onClick={() => handleDelete(sender.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
