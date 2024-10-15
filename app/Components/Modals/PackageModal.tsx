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
  const [type, setType] = useState<string>('non-expiry');
  const [price, setPrice] = useState<number | null>(null);  // Allow price to be null
  const [rate, setRate] = useState<number>(0);
  const [smscount, setSmscount] = useState<number>(0);
  const [expiry, setExpiry] = useState<boolean>(false);  // Default to false
  const [duration, setDuration] = useState<number | null>(null);  // Allow duration to be null
  const [bonusrate, setBonusrate] = useState<number | null>(0);  // New state for bonusrate
  const [userEntry, setUserEntry] = useState<boolean>(false);  // Default to false

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
        expiry,  // Will be false if checkbox is not checked
        duration,
        bonusrate,  // Include bonusrate in the package data
        userEntry,  // Will be false if checkbox is not checked
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

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isExpiry = e.target.checked;
    setExpiry(isExpiry);
    setType(isExpiry ? 'bonus' : 'non-expiry');
  };

  const handleUserEntryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isUserEntry = e.target.checked;
    setUserEntry(isUserEntry);
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

            <label className="block text-gray-700 mb-2" htmlFor="expiry">Has Expiry?</label>
            <input
              id="expiry"
              type="checkbox"
              className="mr-2"
              checked={expiry}
              onChange={handleExpiryChange}
            />
            <span>{expiry ? 'Yes' : 'No'}</span>

            <label className="block text-gray-700 mb-2" htmlFor="userEntry">User Entry?</label>
            <input
              id="userEntry"
              type="checkbox"
              className="mr-2"
              checked={userEntry}
              onChange={handleUserEntryChange}
            />
            <span>{userEntry ? 'Yes' : 'No'}</span>

            <label className="block text-gray-700 mb-2" htmlFor="type">Type</label>
            <select
              id="type"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={type}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
              disabled={expiry}
            >
              {expiry ? (
                <>
                  <option value="bonus">Bonus</option>
                  <option value="expiry">Expiry</option>
                </>
              ) : (
                <option value="non-expiry">Non-expiry</option>
              )}
            </select>

            <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={price ?? ''}  // Allow price to be null
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="Enter package price"
              disabled={userEntry}  // Disable if userEntry is true
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
              disabled={userEntry}  // Disable if userEntry is true
            />

            <label className="block text-gray-700 mb-2" htmlFor="bonusrate">Bonus Rate</label>
            <input
              id="bonusrate"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={bonusrate ?? ''}  // Allow bonusrate to be null
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBonusrate(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="Enter bonus rate"
            />

            <label className="block text-gray-700 mb-2" htmlFor="duration">Duration</label>
            <input
              id="duration"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={duration ?? ''}  // Allow duration to be null
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDuration(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="Enter duration (in days)"
              disabled={!expiry}  // Enable if expiry is true
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
