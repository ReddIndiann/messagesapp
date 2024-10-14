import React, { useEffect, useState } from 'react';
import { fetchWalletHistory } from '@/app/lib/walletUtils';

interface WalletHistory {
  id: number;
  transactionid: string;
  amount: number;
  note: string;
  wallet:any
  createdAt: string;
  updatedAt: string;
}

const WalletHistoryTable: React.FC = () => {
  const [walletHistory, setWalletHistory] = useState<WalletHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch user ID from local storage
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId ? Number(extractedUserId) : null);
    }
  }, []);

  useEffect(() => {
    const getWalletHistory = async () => {
      if (userId !== null) {
        try {
          const data = await fetchWalletHistory(userId);
          setWalletHistory(data.wallet); // Accessing the wallet array from response
        } catch (error) {
          setError('Error fetching wallet history');
        } finally {
          setLoading(false);
        }
      }
    };

    getWalletHistory();
  }, [userId]); // Dependency array includes userId

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Note
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {walletHistory.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.transactionid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                GHS {transaction.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletHistoryTable;
