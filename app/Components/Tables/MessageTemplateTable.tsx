// components/MessageTemplatesTable.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const MessageTemplatesTable = ({ campaigns }) => (
  <table className="min-w-full bg-white border-collapse">
    <thead className="bg-gray-100 text-slate-600">
      <tr>
        <th className="py-2 px-4 text-left border-b">Message Title</th>
        <th className="py-2 px-4 text-left border-b">Content</th>
        <th className="py-2 px-4 text-left border-b">Message Type</th>
        <th className="py-2 px-4 text-left border-b">Date and Time</th>
        <th className="py-2 px-4 text-left border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {campaigns.map(campaign => (
        <tr key={campaign.id} className="border-t">
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.title}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.content}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.messageCategory}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.date}</td>
          <td className="py-4 px-4 flex space-x-2 border-b">
            <button
            title='send'
            className="text-gray-300 text-xl">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            <button 
            
            title='edit'className="text-gray-300 text-xl">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button 
               title='delete'
            className="text-gray-300 text-xl">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MessageTemplatesTable;
