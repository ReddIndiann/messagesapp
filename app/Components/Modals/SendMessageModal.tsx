// app/Components/Modals/SendMessageModal.js

'use client';

import React from 'react';

const SendMessageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Send Message</h2>
        <p className="mb-4">What action do you want to perform to your message</p>
        <button className="w-full bg-gray-200 text-gray-800 py-2 rounded mb-2 hover:bg-gray-300">
          Quick SMS
        </button>
        <button className="w-full bg-gray-200 text-gray-800 py-2 rounded mb-2 hover:bg-gray-300">
          Send to group
        </button>
        <button className="w-full bg-gray-200 text-gray-800 py-2 rounded mb-4 hover:bg-gray-300">
          Send using Excel Sheet
        </button>
        <button
          className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SendMessageModal;