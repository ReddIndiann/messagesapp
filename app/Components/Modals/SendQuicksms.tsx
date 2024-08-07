import React from 'react';

const QuickSMSModal = ({ isOpen, onClose, onNext }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 text-gray-500">Select Individual</h2>
        <form>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Recipient</label>
            <textarea
              className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-opacity-50 text-gray-800"
              placeholder="Enter your message"
              rows="6"
            ></textarea>
          </div>
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              className="w-full sm:w-auto bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 text-sm sm:text-base"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full sm:w-auto bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 text-sm sm:text-base"
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickSMSModal;
