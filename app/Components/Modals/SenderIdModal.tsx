// SendMessageModal.js

import React from 'react';

const SendMessageModal = ({ isOpen, onClose, onQuickSMSClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-112">
        <h2 className="text-xl font-medium mb-4 text-black">Send Message</h2>
        <p className="mb-4 text-black text-sm">What action do you want to perform to your message</p>
        <button
          className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-orange-100 hover:text-orange-400"
          onClick={() => {
            onClose();
            onQuickSMSClick();
          }}
        >
          Quick SMS
        </button>
        <button className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-orange-100 hover:text-orange-400">
          Send to group
        </button>
        <button className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-orange-100 hover:text-orange-400">
          Send using Excel Sheet
        </button>
        <button className="w-24 bg-gray-100 text-gray-800 py-2 mt-5 rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SendMessageModal;
