import React, { useState, ChangeEvent } from 'react';
import { registerSenderId } from '@/app/lib/senderIdUtils';

interface SenderIdRegistrarionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  onSuccess: () => void; // Callback to trigger refetch after successful registration
}

const SenderIdRegistrarion: React.FC<SenderIdRegistrarionModalProps> = ({ isOpen, onClose, userId, onSuccess }) => {
  const [senderID, setSenderID] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRegister = async () => {
    if (!userId) return;

    try {
      await registerSenderId(senderID, userId, purpose);

      // Show success modal
      setShowSuccessModal(true);

      // Call the onSuccess callback to refetch the list
      onSuccess();

      // Close the modal after showing success
      setTimeout(() => {
        setShowSuccessModal(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error registering Sender ID:', error);
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
              className="w-full p-2 border border-gray-300 rounded text-black" // Set text color to black
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
              className="w-full p-2 border border-gray-300 rounded text-black" // Set text color to black
              value={purpose}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPurpose(e.target.value)}
              placeholder="Enter the purpose of the Sender ID"
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
    </div>
  );
};

export default SenderIdRegistrarion;
