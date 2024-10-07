'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  });
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'voiceCalls' | 'admin'>('bulkSMS');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
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
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
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
                  className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
                />
              </div>
              <div className="flex justify-between">
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
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
