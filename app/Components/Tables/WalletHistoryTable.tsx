import React from 'react';

const WalletHistoryTable = () => {
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
              Balance Before Deposit
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              MoMo Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              6baf0ca9-4d10-4f0b-b2df-a451f879fb6f_prod
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              2024-08-02
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              GHS 10.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              GHS 0.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              0245392996
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              SUCCESS
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Korba(MTN)
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              3dc8dc26-6b58-47cf-92da-2e95d9cd563a_prod
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              2024-08-02
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              GHS 10.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              GHS 0.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              0245392996
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              FAILED
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Korba(MTN)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WalletHistoryTable;
