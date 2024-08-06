// QuickSMSModal.js

import React from 'react';

const QuickSMSModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-112">
        <h2 className="text-xl font-medium mb-4 text-black">Quick SMS</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Recipient</label>
            <input 
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              placeholder="Enter recipient's phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              placeholder="Enter your message"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mb-2 hover:bg-blue-700"
          >
            Send
          </button>
          <button
            type="button"
            className="w-full bg-gray-100 text-gray-800 py-2 rounded mt-2 hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickSMSModal;
