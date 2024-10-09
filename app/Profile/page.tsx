'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import { userdetails, updateUserDetails } from '../lib/authUtils';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    number: string;
  }>({
    username: '',
    email: '',
    number: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'voiceCalls' | 'admin'>('bulkSMS');

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          setLoading(true);
          const data = await userdetails(userId);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      // If saving, update user details
      try {
        await updateUserDetails(userId as number, userData); // Pass userId and userData to the update function
        alert('User details updated successfully!'); // Show success message
      } catch (error) {
        alert('Error updating user details. Please try again.'); // Show error message
      }
    }
    setIsEditing(!isEditing); // Toggle editing mode
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentSection={currentSection} />
      <div className="flex flex-1 pt-16">
        <Sidebar onCollapse={() => {}} setCurrentSection={() => {}} />
        <main className="flex-1 ml-64 p-6 overflow-y-auto">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center   text-slate-500">Profile Information</h2>
            {loading ? (
              <p className="text-center text-gray-500">Loading user data...</p>
            ) : (
              <>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <img
                      src="https://source.unsplash.com/random/100x100/?user"
                      alt="User Avatar"
                      className="w-24 h-24 rounded-full border-4 border-blue-500"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center border-4 border-white transform hover:scale-110 transition-transform"
                      title="Change Avatar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
  type="text"
  name="username" // Change from "name" to "username"
  value={userData.username}
  onChange={handleChange}
  disabled={!isEditing}
  className={`mt-1 block w-full border text-slate-500 rounded-md p-2 ${isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
/>

                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 block w-full text-slate-500 border rounded-md p-2 ${isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700">Phone</label>
                    <input
  type="tel"
  name="number" // Change from "phone" to "number"
  value={userData.number}
  onChange={handleChange}
  disabled={!isEditing}
  className={`mt-1 block text-slate-500 w-full border rounded-md p-2 ${isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
/>

                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={toggleEdit}
                      className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                    >
                      {isEditing ? 'Save' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-400 text-white rounded-md px-4 py-2 hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
