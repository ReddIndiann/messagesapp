import React, { useState, ChangeEvent } from 'react';
import { signUp } from '@/app/lib/authUtils';
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  onSuccess: () => void; // Callback to trigger refetch after successful registration
}

const AddUser: React.FC<AddUserModalProps> = ({ isOpen, onClose, userId, onSuccess }) => {
  const [senderID, setSenderID] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(''); // State to hold the error message

  if (!isOpen) return null;

  const handleRegister = async () => {
    if (!userId) return;

    try {
      await signUp(senderID, userId, purpose);

      // Show success modal
      setShowSuccessModal(true);

      // Call the onSuccess callback to refetch the list
      onSuccess();

      // Close the modal after showing success
      setTimeout(() => {
        setShowSuccessModal(false);
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error('Error registering Sender ID:', error);

      // Set the error message and show the error modal
      setErrorMessage(error.response?.data?.msg || 'An error occurred while registering the Sender ID');
      setShowErrorModal(true);

      // Close the error modal after some time
      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-medium mb-4 text-black">Register a new Sender ID</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="sender-id">
              Sender ID
            </label>
            <input
              id="sender-id"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={senderID}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSenderID(e.target.value)}
              placeholder="Enter sender name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="purpose">
              Purpose
            </label>
            <textarea
              id="purpose"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={purpose}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPurpose(e.target.value)}
              placeholder="Enter the purpose of the Sender ID"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500" onClick={handleRegister}>
              Register Sender ID
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-medium text-green-600">Success!</h2>
            <p className="text-gray-700">Sender ID registered successfully.</p>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-medium text-red-600">Error!</h2>
            <p className="text-gray-700">{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
