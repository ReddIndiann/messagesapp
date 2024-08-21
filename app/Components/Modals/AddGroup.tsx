import React, { useState, ChangeEvent, useEffect } from 'react';
import createGroup from '@/app/lib/grouputil';

// Define the props type interface
interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGroup: React.FC<AddGroupModalProps> = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Retrieve and parse the user ID from async storage
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

  if (!isOpen) return null;

  const handleRegister = async () => {
    if (userId === null) {
      console.error('User ID is not available.');
      return;
    }

    try {
      await createGroup({
        groupName,
        userId
      });
      onClose();
    } catch (error) {
      console.error('Error registering group:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
        <h2 className="text-xl font-medium mb-4 text-black">Register a new Group</h2>
        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="group-name">
            Group Name
          </label>
          <input
            id="group-name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={groupName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-black py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
            onClick={handleRegister}
          >
            Register Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
