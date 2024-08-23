import React from 'react';

interface ViewGroupProps {
  isOpen: boolean;
  onClose: () => void;
  group: any;
}

const ViewGroup: React.FC<ViewGroupProps> = ({ isOpen, onClose, group }) => {
  if (!group || !isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md  text-gray-900">
        <h2 className="text-xl font-semibold mb-4">Group Details</h2>
        <p className="mb-2"><strong>Group Name:</strong> {group.groupName}</p>
        <p className="mb-4"><strong>Members:</strong> {group.contacts.map((contact: any) => contact.firstname).join(', ')}</p>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewGroup;
