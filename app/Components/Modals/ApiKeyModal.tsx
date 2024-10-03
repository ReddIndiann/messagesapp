import React, { useState, ChangeEvent } from 'react';
import { registerApiKeys } from '@/app/lib/apikeyutils';

interface ApiKeyCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
// Callback to trigger refetch after successful registration
}

const ApiKeyCreation: React.FC<ApiKeyCreationModalProps> = ({ isOpen, onClose, userId,  }) => {
  const [keyName, setKeyName] = useState<string>('');

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  if (!isOpen) return null;

  const handleRegister = async () => {
    if (!userId) return;
  
    try {
      await registerApiKeys(keyName, userId);
  
      // Show success modal
      setShowSuccessModal(true);
  
      // Call the onSuccess callback to refetch the list
   
  
      // Close the modal after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false); // Hide success modal
        onClose(); // Close the modal
      }, 2000);
    } catch (error:any) {
      console.error('Error Creating API keys:', error);

      // Set error message and show error modal
      setErrorMessage(error.response?.data?.message || 'An error occurred while creating the API key.');
      setShowErrorModal(true);

      // Hide the error modal after 3 seconds
      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
    }
  };
  

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-medium mb-4 text-black">Create a new Api Key</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="sender-id">
              Name
            </label>
            <input
              id="sender-id"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black" // Set text color to black
              value={keyName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyName(e.target.value)}
              placeholder="Enter  name"
            />
          </div>
        
          <div className="flex justify-end">
            <button
              className="bg-gray-100 text-gray-800 py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
              onClick={handleRegister}
            >
              Create Api key
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-medium text-green-600">Success!</h2>
            <p className="text-gray-700">API key created successfully.</p>
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

export default ApiKeyCreation;
