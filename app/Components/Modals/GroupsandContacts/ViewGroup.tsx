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
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-gray-800 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">Group Details</h2>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Group Name:</span> {group.groupName}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Members:</span>{' '}
            {group.contacts && group.contacts.length > 0 ? (
              group.contacts.map((contact: any) => contact.firstname).join(', ')
            ) : (
              'No members'
            )}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewGroup;
