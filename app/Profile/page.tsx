'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';
import { userdetails, updateUserDetails } from '../lib/authUtils';
import Swal from 'sweetalert2';

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
  const [currentSection, setCurrentSection] = useState<'bulkSMS' | 'Developer' | 'admin'>('bulkSMS');

  // Password-related state
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);

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
        Swal.fire('Success!', 'User details updated successfully!', 'success'); // Show success message using SweetAlert
      } catch (error) {
        Swal.fire('Error!', 'Error updating user details. Please try again.', 'error'); // Show error message using SweetAlert
      }
    }
    setIsEditing(!isEditing); // Toggle editing mode
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      Swal.fire('Error!', 'New passwords do not match!', 'error');
      return;
    }
    try {
      // Call your backend API to update the password here
      // Example: await changePassword({ oldPassword, newPassword });

      Swal.fire('Success!', 'Password updated successfully!', 'success');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setIsEditingPassword(false);
    } catch (error) {
      Swal.fire('Error!', 'Error changing password. Please try again.', 'error');
    }
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
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-500">Profile Information</h2>
            {loading ? (
              <p className="text-center text-gray-500">Loading user data...</p>
            ) : (
              <>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 block w-full border text-black rounded-md p-2 ${isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
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
                      className={`mt-1 block w-full text-black border rounded-md p-2 ${isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="number"
                      value={userData.number}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 block text-black w-full border rounded-md p-2 ${isEditing ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
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

                {/* Password Change Section */}
                <h2 className="text-2xl font-bold mt-8 mb-6 text-center text-slate-500">Change Password</h2>
                <div className="mb-4">
                  <label className="block text-gray-700">Old Password</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                  >
                    Save Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingPassword(false)}
                    className="bg-gray-400 text-white rounded-md px-4 py-2 hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
