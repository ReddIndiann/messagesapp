import React from 'react';

const BundleHistoryTable = () => {
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Balance Before Bundle
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SMS Bonus
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bundle Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bundle By
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              0
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              10
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              400
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              GHC 10.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Mobile Money
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              SMS
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Daniel
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BundleHistoryTable;
