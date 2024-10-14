import React, { useState, ChangeEvent } from 'react';
import { createCreditUsage } from '@/app/lib/package';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface CreditUsageModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  onSuccess: () => void;
}

const CreditUsage: React.FC<CreditUsageModalProps> = ({ isOpen, onClose, userId, onSuccess }) => {
  const [usefirst, setUsefirst] = useState<string>('');
  const [usesecond, setusesecond] = useState<string>('');
  const [usethird, setUsethird] = useState<string>('');
 

  const MySwal = withReactContent(Swal);

  if (!isOpen) return null;

  const handleRegister = async () => {
    if (!userId) return;

    try {
      // Send the data to the `createPackage` function
      await createCreditUsage({
        usefirst,
        usesecond,
        usethird,
       
      
      });

      // Display success alert
      MySwal.fire({
        title: 'Success!',
        text: 'Package created successfully.',
        icon: 'success',
        timer: 2000, // Automatically close after 2 seconds
        showConfirmButton: false,
        willClose: () => {
          onClose();
        },
      });

      onSuccess();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred while creating the package.';

      // Display error alert
      MySwal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        timer: 3000, // Automatically close after 3 seconds
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-medium mb-4 text-black">Create a new Package</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">First</label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={usefirst}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsefirst(e.target.value)}
              placeholder="First Usage"
            />
            
            <label className="block text-gray-700 mb-2" htmlFor="type">Second</label>
            <input
              id="type"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={usesecond}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setusesecond(e.target.value)}
              placeholder="Second Usage"
            />

            <label className="block text-gray-700 mb-2" htmlFor="price">Third</label>
            <input
              id="price"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={usethird}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsethird(e.target.value)}
              placeholder="Third Usage"
            />

           
          </div>

          <div className="flex justify-end">
            <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500" onClick={handleRegister}>
              Create Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditUsage;
