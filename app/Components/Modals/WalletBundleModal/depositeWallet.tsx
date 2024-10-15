import React, { useState, ChangeEvent, useEffect } from 'react';
import { depositewallet } from '@/app/lib/walletUtils';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert

interface DepositeWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepositSuccess: (amount: number) => void; // Add this line
}
const DepositeWallet: React.FC<DepositeWalletModalProps> = ({ isOpen, onClose, onDepositSuccess }) => {
  const [number, setnumber] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [amount, setAmount] = useState<string>(''); // Changed to string to handle input
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useRouter();

  useEffect(() => {
    // Retrieve and parse the user ID from local storage
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

  if (!isOpen) return null;

  const handleRegister = async () => {
    if (userId === null || amount === '') {
      console.error('User ID or amount is not available.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User ID or amount is missing!',
      });
      return;
    }

    try {
      // Convert the amount to a number
      const parsedAmount = parseFloat(amount);

      await depositewallet({
        
        userId,
        amount: parsedAmount, // Use parsed number here
        note,
      });
      onDepositSuccess(parsedAmount);
      // Show success alert using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Deposited Into Account successfully.',
        confirmButtonText: 'OK',
      }).then(() => {
        onClose();
       
      });
    } catch (error) {
      console.error('Error registering group:', error);

      // Show error alert using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue depositing into account. Please try again later.',
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
          <h2 className="text-xl font-medium mb-4 text-black">Deposite Into Account</h2>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="transaction-id">
             Number
            </label>
            <input
              id="transaction-id"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={number}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setnumber(e.target.value)}
              placeholder="Enter number"
            />
            <label className="block text-black mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)} // Change handler to update amount as string
              placeholder="Enter amount"
            />
            <label className="block text-black mb-2" htmlFor="note">
              Note
            </label>
            <input
              id="note"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={note}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
              placeholder="Enter note"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-gray-100 text-black py-2 px-4 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500" onClick={handleRegister}>
              Deposite
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositeWallet;
