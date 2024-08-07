import React from 'react';

const ConfirmationMessageModal = ({ isOpen, onClose, senderID, campaignTitle, messageContent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-medium mb-6 text-black">Confirmation Message</h2>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Sender ID:</p>
          <p className="text-gray-800">{senderID}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Campaign Title:</p>
          <p className="text-gray-800">{campaignTitle}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Message Content:</p>
          <p className="text-gray-800">{messageContent}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Character Count:</p>
          <p className="text-gray-800">{messageContent.length} characters</p>
        </div>
        <div className="flex justify-between gap-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-6 py-2 rounded-md text-sm"
            onClick={onClose}
          >
            Back
          </button>
          <button
            type="button"
            className="bg-orange-500 text-white px-6 py-2 rounded-md text-sm"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessageModal;
