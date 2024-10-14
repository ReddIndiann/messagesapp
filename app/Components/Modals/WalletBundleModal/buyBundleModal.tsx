import React, { useState, ChangeEvent, useEffect } from 'react';
import { depositewallet } from '@/app/lib/walletUtils';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert
interface BuyBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: any; // Add selectedPlan prop
}

const BuyBundle: React.FC<BuyBundleModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [transactionid, setTransactionid] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [amount, setAmount] = useState<string>(''); 
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useRouter();

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }

    // Set the selected plan amount automatically when modal opens
    if (selectedPlan) {
      setAmount(selectedPlan.price.toString());
    }
  }, [selectedPlan]);

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
      const parsedAmount = parseFloat(amount);

      await depositewallet({
        transactionid,
        userId,
        amount: parsedAmount,
        note,
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Deposited Into Account successfully.',
        confirmButtonText: 'OK',
      }).then(() => {
        onClose();
        navigate.push('/');
      });
    } catch (error) {
      console.error('Error registering group:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue depositing into account. Please try again later.',
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
        <h2 className="text-xl font-medium mb-4 text-black">Buy Bundle</h2>
        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="transaction-id">
            Transaction ID
          </label>
          <input
            id="transaction-id"
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={transactionid}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTransactionid(e.target.value)}
            placeholder="Enter transaction ID"
          />
          <label className="block text-black mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={amount}
            disabled // Disable the amount field
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
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyBundle;
