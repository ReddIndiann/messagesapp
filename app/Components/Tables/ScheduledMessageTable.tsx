import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Campaign {
  id: number;
  content: string;
  dateScheduled: string; // Date string
  timeScheduled: string; // Time string
  status: string;
  recipients: string;
  messageType: string;
  recursion: string;
}

interface ScheduledMessageTableProps {
  campaigns: Campaign[];
}

const ScheduledMessageTable: React.FC<ScheduledMessageTableProps> = ({ campaigns }) => (
  <table className="min-w-full bg-white border-collapse">
    <thead className="bg-gray-100 text-slate-600">
      <tr>
        <th className="py-2 px-4 text-left border-b">Content</th>
        <th className="py-2 px-4 text-left border-b">Recipients</th>
        <th className="py-2 px-4 text-left border-b">Date Scheduled</th>
        <th className="py-2 px-4 text-left border-b">Time Scheduled</th>
        <th className="py-2 px-4 text-left border-b">Message Type</th>
        <th className="py-2 px-4 text-left border-b">Recursion</th>
        <th className="py-2 px-4 text-left border-b">Status</th>
        <th className="py-2 px-4 text-left border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {campaigns.map((campaign) => (
        <tr key={campaign.id} className="border-t">
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.content}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.recipients}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{new Date(campaign.dateScheduled).toLocaleDateString()}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.timeScheduled}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.messageType}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.recursion}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{campaign.status}</td>
          <td className="py-4 px-4 flex space-x-2 border-b">
           
            <button className="text-gray-300 text-xl" title="Edit">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="text-gray-300 text-xl" title="Delete">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ScheduledMessageTable;
