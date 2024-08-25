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
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
        <p className="mb-2"><strong>Name:</strong> {contact.firstname} {contact.lastname}</p>
        <p className="mb-2"><strong>Phone:</strong> {contact.phone}</p>
        <p className="mb-4"><strong>Email:</strong> {contact.email}</p>
        <p className="mb-4"><strong>Members:</strong> {contact.groups.map((contact: any) => contact.groups).join(', ')}</p>
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

export default ViewContact;
