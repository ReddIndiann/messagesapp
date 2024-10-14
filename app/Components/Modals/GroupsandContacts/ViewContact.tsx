import React from 'react';

interface ViewContactProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
}

const ViewContact: React.FC<ViewContactProps> = ({ isOpen, onClose, contact }) => {
  if (!contact || !isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">Contact Details</h2>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {contact.firstname} {contact.lastname}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Phone:</span> {contact.phone}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {contact.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Groups:</span>{' '}
            {contact.groups && contact.groups.length > 0 ? (
              contact.groups.map((group: any) => group.groupName).join(', ')
            ) : (
              'No groups assigned'
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

export default ViewContact;
