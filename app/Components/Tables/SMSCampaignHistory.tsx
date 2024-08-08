// components/TableComponent.js
import React from 'react';

const TableComponent = ({ data, section }) => {
  const renderTableContent = () => {
    if (section === 'campaignHistory') {
      return data.length > 0 ? (
        data.map((item, index) => (
          <tr key={index} className="border-t">
            <td className="py-4 px-4 text-gray-500 border-b">{item.name}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.totalRecipients}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.senderId}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.dateTime}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.totalCreditUsed}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.walletBalanceUsed}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="py-4 px-4 text-center text-gray-500 border-b">
            No Data Available
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td colSpan="6" className="py-4 px-4 text-center text-gray-500 border-b">
          No Data Available
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {section === 'campaignHistory' ? 'SMS Campaign History' : 'Delivery Report'}
      </h2>
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-100 text-slate-600">
          <tr>
            <th className="py-2 px-4 text-left border-b">Name</th>
            <th className="py-2 px-4 text-left border-b">Total Recipients</th>
            <th className="py-2 px-4 text-left border-b">Sender ID</th>
            <th className="py-2 px-4 text-left border-b">Date and Time</th>
            <th className="py-2 px-4 text-left border-b">Total Credit Used</th>
            <th className="py-2 px-4 text-left border-b">Wallet Balance Used</th>
          </tr>
        </thead>
        <tbody>
          {renderTableContent()}
        </tbody>
      </table>
      {section === 'campaignHistory' && (
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm">
            1
          </button>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
