import React, { useState, useRef, useEffect } from 'react';

const AddSenderIdModal = ({ isOpen, onClose, onSubmit }) => {
  const [senderId, setSenderId] = useState('');
  const [purpose, setPurpose] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ senderId, purpose });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-xl w-[600px]"
      >
        <h2 className="text-2xl font-semibold mb-6">Register a new Sender ID</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">* Sender ID</label>
            <input
              type="text"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              className="w-full border border-gray-500 bg-gray-100 rounded-md shadow-sm p-3"
              placeholder="Enter sender name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">* Purpose</label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full border border-gray-500 bg-gray-100 rounded-md shadow-sm p-3"
              placeholder="Enter the purpose of the Sender ID"
              rows="4"
              required
            />
          </div>
          <div className="text-sm text-gray-500 mb-6">
            Sender IDs can also be registered via our API. Find <a href="#" className="text-orange-400">here</a> in our documentation.
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-400 text-white rounded-md text-sm font-medium"
            >
              Register Sender ID
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSenderIdModal;
