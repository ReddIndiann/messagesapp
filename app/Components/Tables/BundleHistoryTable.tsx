import React, { useEffect, useState } from 'react';
import { fetchBundleHistory } from '@/app/lib/bundlesUtils';

const BundleHistoryTable = () => {
  const [bundles, setBundles] = useState([]);
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
    const fetchBundles = async () => {
      if (userId !== null) {
        try {
          const data = await fetchBundleHistory(userId); // Use dynamic user ID
          setBundles(data.bundles);
        } catch (err) {
          setError('Failed to fetch bundle history');
          console.error(err);
        }
      }
    };

    fetchBundles();
  }, [userId]); // Dependency array includes userId

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Package Name
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Creditscore
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry Date
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bundle Type
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bundle By
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bundles.map((bundle, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                {bundle.package_name}
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                {bundle.creditscore}
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                {new Date(bundle.expiry).toLocaleDateString()} {/* Formats the date */}
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                {bundle.status}
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                {bundle.type}
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                {bundle.User.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BundleHistoryTable;
