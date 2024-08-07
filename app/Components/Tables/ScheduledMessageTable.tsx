// components/ScheduledMessagesTable.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ScheduledMessagesTable = ({ messages }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border-collapse max-w-full mx-auto text-sm">
      <thead className="bg-gray-100 text-slate-600">
        <tr>
          <th className="py-2 px-4 text-left border-b">Message Title</th>
          <th className="py-2 px-4 text-left border-b">Content</th>
          <th className="py-2 px-4 text-left border-b">Schedule</th>
          <th className="py-2 px-4 text-left border-b">Last Sent</th>
          <th className="py-2 px-4 text-left border-b">Recipient</th>
          <th className="py-2 px-4 text-left border-b">Status</th>
          <th className="py-2 px-4 text-left border-b">Repeat Period</th>
          <th className="py-2 px-4 text-left border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {messages.map(message => (
          <tr key={message.id} className="border-t">
            <td className="py-4 px-2 text-gray-500 border-b">{message.title}</td>
            <td className="py-4 px-2 text-gray-500 border-b">{message.content}</td>
            <td className="py-4 px-2 text-gray-500 border-b">{message.scheduled}</td>
            <td className="py-4 px-2 text-gray-500 border-b">{message.lastseen}</td>
            <td className="py-4 px-2 text-gray-500 border-b">{message.recipient}</td>
            <td className="py-4 px-2 text-gray-500 border-b">{message.status}</td>
            <td className="py-4 px-2 text-gray-500 border-b">{message.repeatperiod}</td>
            <td className="py-4 px-2 flex space-x-2 border-b">
              <button className="text-gray-300 text-base sm:text-lg">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              <button className="text-gray-300 text-base sm:text-lg">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="text-gray-300 text-base sm:text-lg">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ScheduledMessagesTable;
