import React, { useState, ChangeEvent } from 'react';

// Define the props type
interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({ isOpen, onClose }) => {
  const [senderID, setSenderID] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');

  if (!isOpen) return null;

  const handleRegister = () => {
    // Logic to handle the registration of the Sender ID
    console.log('Sender ID:', senderID);
    console.log('Purpose:', purpose);
    onClose();
  };

  return (
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
            className="w-full p-2 border border-gray-300 rounded"
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
            className="w-full p-2 border border-gray-300 rounded"
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
  );
};

export default SendMessageModal;
