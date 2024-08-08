import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InternationalMessagesTable = ({ messages, campaigns }) => {
  const [messageSearch, setMessageSearch] = useState('');
  const [campaignSearch, setCampaignSearch] = useState('');

  const filteredMessages = messages.filter((message) =>
    message.country.toLowerCase().includes(messageSearch.toLowerCase())
  );

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(campaignSearch.toLowerCase())
  );

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between">
      <div className="overflow-x-auto w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search by Country"
          className="w-full p-2 mb-2 border rounded"
          value={messageSearch}
          onChange={(e) => setMessageSearch(e.target.value)}
        />
        <table className="min-w-full bg-white border-collapse max-w-full mx-auto text-sm">
          <thead className="bg-gray-100 text-slate-600">
            <tr>
              <th className="py-2 px-4 text-left border-b">Country</th>
              <th className="py-2 px-4 text-left border-b">Code</th>
              <th className="py-2 px-4 text-left border-b">International Rate</th>
              <th className="py-2 px-4 text-left border-b">Local Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((message, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-4 px-2 text-gray-500 border-b">{message.country}</td>
                <td className="py-4 px-2 text-gray-500 border-b">{message.code}</td>
                <td className="py-4 px-2 text-gray-500 border-b">{message.internationalRate}</td>
                <td className="py-4 px-2 text-gray-500 border-b">{message.localRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="overflow-x-auto w-full md:w-2/3 md:ml-4">
        <input
          type="text"
          placeholder="Search by Title"
          className="w-full p-2 mb-2 border rounded"
          value={campaignSearch}
          onChange={(e) => setCampaignSearch(e.target.value)}
        />
        <table className="min-w-full bg-white border-collapse max-w-full mx-auto text-sm">
          <thead className="bg-gray-100 text-slate-600">
            <tr>
              <th className="py-2 px-4 text-left border-b">Title</th>
              <th className="py-2 px-4 text-left border-b">Content</th>
              <th className="py-2 px-4 text-left border-b">Select Country</th>
              <th className="py-2 px-4 text-left border-b">Countries</th>
              <th className="py-2 px-4 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((campaign, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-4 px-2 text-gray-500 border-b">{campaign.title}</td>
                <td className="py-4 px-2 text-gray-500 border-b">{campaign.content}</td>
                <td className="py-4 px-2 text-gray-500 border-b">
                  <select className="border p-1 rounded">
                    <option value="">Select Country</option>
                    {messages.map((message, idx) => (
                      <option key={idx} value={message.country}>{message.country}</option>
                    ))}
                  </select>
                </td>
                <td className="py-4 px-2 text-gray-500 border-b">{campaign.countries.join(', ')}</td>
                <td className="py-4 px-2 text-gray-500 border-b">{campaign.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

InternationalMessagesTable.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      internationalRate: PropTypes.string.isRequired,
      localRate: PropTypes.string.isRequired,
    })
  ).isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      countries: PropTypes.arrayOf(PropTypes.string).isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default InternationalMessagesTable;
