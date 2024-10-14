import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert
import axios from 'axios';
import dayjs from 'dayjs';
interface BuyCreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: any; // Selected plan prop to get the price and other details
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const BuyCreditModal: React.FC<BuyCreditModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [transactionId, setTransactionId] = useState<string>(''); // User's transaction ID for mobile payment
  const [note, setNote] = useState<string>(''); // Optional note
  const [amount, setAmount] = useState<string>(''); // Bundle price
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useRouter();

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }

    // Automatically set the amount based on the selected plan when modal opens
    if (selectedPlan) {
      setAmount(selectedPlan.price.toString());
    }
  }, [selectedPlan]);

  // If modal is not open, return null to hide it
  if (!isOpen) return null;

  const handleBuyCredit = async () => {
    if (userId === null || amount === '' || transactionId === '') {
      console.error('User ID, amount, or transaction ID is missing.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User ID, amount, or transaction ID is missing!',
      });
      return;
    }

    const expiryDate = calculateExpiry(selectedPlan.duration);

    const bundleData = {
      userId,
      packageId: selectedPlan.id,
      package_name: selectedPlan.name,
      type: selectedPlan.type,
      expiry: expiryDate,
      status: 'active',
      creditscore: selectedPlan.smscount,
      transactionId, // Include the transaction ID
      note, // Optional note
      amount: parseFloat(amount), // Include the amount if needed
    };

    try {
      const response = await axios.post(`${apiUrl}/bundle/createoutapp`, bundleData);
      console.log(`Successfully bought ${selectedPlan.name}`, response.data);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `You have successfully purchased the ${selectedPlan.name} bundle.`,
        confirmButtonText: 'OK',
      }).then(() => {
        onClose(); // Close the modal after success
        navigate.push('/'); // Navigate to the home page or another page
      });
    } catch (error) {
      console.error('Error processing purchase:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue processing your purchase. Please try again later.',
      });
    }
  };

  const calculateExpiry = (duration: number) => {
    const now = dayjs();
    return now.add(duration, 'day').format('YYYY-MM-DD');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
        <h2 className="text-xl font-medium mb-4 text-black">Buy Credit Bundle</h2>
        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="transaction-id">
            Transaction ID
          </label>
          <input
            id="transaction-id"
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={transactionId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTransactionId(e.target.value)}
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
            disabled // Disable amount field to show the selected plan price
          />
          <label className="block text-black mb-2" htmlFor="note">
            Note (Optional)
          </label>
          <input
            id="note"
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={note}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
            placeholder="Enter a note (optional)"
          />
        </div>
        <div className="flex justify-end">
          <button className="bg-gray-100 text-black py-2 px-4 rounded mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500" onClick={handleBuyCredit}>
            Buy Credit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCreditModal;
