import React from 'react';

const SendToGroupModal = ({ isOpen, onClose, onSend }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-medium mb-6 text-black">Select Group to Send To</h2>
        <div className="mb-6">
          <div className="mb-4 flex justify-between items-center text-black">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Friends</span>
            </label>
            <span className="text-gray-600">120 members</span>
          </div>
          <div className="mb-4 flex justify-between items-center text-black">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">List</span>
            </label>
            <span className="text-gray-600">85 members</span>
          </div>
          <p className="text-black text-sm mt-2">All groups loaded successfully</p>
        </div>
        <div className="flex gap-4">
          <button
            className="flex-1 bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500"
            onClick={onSend}
          >
            Send
          </button>
          <button className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendToGroupModal;
