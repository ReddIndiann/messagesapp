import React, { useState, ChangeEvent } from 'react';
import { createPackage } from '@/app/lib/package';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface PackageCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  onSuccess: () => void;
}

const PackageCreation: React.FC<PackageCreationModalProps> = ({ isOpen, onClose, userId, onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [smscount, setSmscount] = useState<number>(0);
  const [expiry, setExpiry] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);

  const MySwal = withReactContent(Swal);

  if (!isOpen) return null;

  const handleRegister = async () => {
    if (!userId) return;

    try {
      // Send the data to the `createPackage` function
      await createPackage({
        name,
        type,
        price,
        rate,
        smscount,
        expiry,
        duration,
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
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Enter package name"
            />
            
            <label className="block text-gray-700 mb-2" htmlFor="type">Type</label>
            <input
              id="type"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={type}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
              placeholder="Enter package type (e.g., SMS)"
            />

            <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(parseFloat(e.target.value))}
              placeholder="Enter package price"
            />

            <label className="block text-gray-700 mb-2" htmlFor="rate">Rate</label>
            <input
              id="rate"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={rate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRate(parseFloat(e.target.value))}
              placeholder="Enter rate per message"
            />

            <label className="block text-gray-700 mb-2" htmlFor="smscount">SMS Count</label>
            <input
              id="smscount"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={smscount}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSmscount(parseInt(e.target.value))}
              placeholder="Enter SMS count"
            />

            <label className="block text-gray-700 mb-2" htmlFor="expiry">Expiry</label>
            <input
              id="expiry"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={expiry}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setExpiry(e.target.value)}
              placeholder="Enter expiry (e.g., 30 days)"
            />

            <label className="block text-gray-700 mb-2" htmlFor="duration">Duration</label>
            <input
              id="duration"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={duration}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDuration(parseInt(e.target.value))}
              placeholder="Enter duration (in days)"
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

export default PackageCreation;
