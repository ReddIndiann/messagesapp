import React, { useState, ChangeEvent, useEffect } from 'react';
import { createGroup } from '@/app/lib/grouputil';


interface EditGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: any;
}

const EditGroup: React.FC<EditGroupModalProps> = ({ isOpen, onClose, group }) => {
  const [groupName, setGroupName] = useState<string>(group?.groupName ||'');
  const [userId, setUserId] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    if (group) {
      setGroupName(group.groupName || '');

      
    }
  }, [group]);
  useEffect(() => {
    // Retrieve and parse the user ID from local storage
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

  if (!isOpen) return null;

  const handleSaveChanges = async () => {
    if (!group) {
      console.error('No contact to edit.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/groups/${group.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        groupName
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update group.');
      }

      setShowSuccessModal(true);

      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
          <h2 className="text-xl font-medium mb-4 text-black">Edit Group</h2>
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
              onClick={handleSaveChanges}
            >
              Register Group
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10">
            <h2 className="text-xl font-medium text-green-600">Success!</h2>
            <p className="text-gray-700">Group registered successfully.</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
                onClick={handleCloseSuccessModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditGroup;
