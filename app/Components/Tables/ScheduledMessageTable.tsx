import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Campaign {
  id: number;
  content: string;
  dateScheduled: string;
  timeScheduled: string;
  status: string;
  recipients: string | string[] | number;
  messageType: string;
  recursion: string;
}

interface ScheduledMessageTableProps {
  campaigns: Campaign[];
}

const ScheduledMessageTable: React.FC<ScheduledMessageTableProps> = ({ campaigns }) => {
  const [expandedRow, setExpandedRow] = React.useState<number | null>(null);

  const truncateContent = (content: string, maxLength: number = 50) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const formatRecipients = (recipients: string | string[] | number): string => {
    if (typeof recipients === 'number') {
      return recipients === 1 ? '1 recipient' : `${recipients} recipients`;
    }
    if (Array.isArray(recipients)) {
      return recipients.length === 1 ? recipients[0] : `${recipients.length} recipients`;
    }
    if (typeof recipients === 'string') {
      const recipientList = recipients.split(',').map(r => r.trim());
      return recipientList.length === 1 ? recipientList[0] : `${recipientList.length} recipients`;
    }
    return 'Unknown';
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-gray-100 text-slate-600">
          <tr>
            <th className="py-2 px-4 text-left border-b">Content</th>
            <th className="py-2 px-4 text-left border-b hidden md:table-cell">Recipients</th>
            <th className="py-2 px-4 text-left border-b hidden lg:table-cell">Date Scheduled</th>
            <th className="py-2 px-4 text-left border-b hidden lg:table-cell">Time Scheduled</th>
            <th className="py-2 px-4 text-left border-b hidden xl:table-cell">Message Type</th>
            <th className="py-2 px-4 text-left border-b hidden xl:table-cell">Recursion</th>
            <th className="py-2 px-4 text-left border-b">Status</th>
            <th className="py-2 px-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <React.Fragment key={campaign.id}>
              <tr className="border-t">
                <td className="py-4 px-4 text-gray-500 border-b">
                  <button 
                    className="flex items-center w-full text-left"
                    onClick={() => toggleRowExpansion(campaign.id)}
                  >
                    {truncateContent(campaign.content)}
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`ml-2 transform transition-transform duration-200 ${expandedRow === campaign.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                </td>
                <td className="py-4 px-4 text-gray-500 border-b hidden md:table-cell">{formatRecipients(campaign.recipients)}</td>
                <td className="py-4 px-4 text-gray-500 border-b hidden lg:table-cell">{new Date(campaign.dateScheduled).toLocaleDateString()}</td>
                <td className="py-4 px-4 text-gray-500 border-b hidden lg:table-cell">{campaign.timeScheduled}</td>
                <td className="py-4 px-4 text-gray-500 border-b hidden xl:table-cell">{campaign.messageType}</td>
                <td className="py-4 px-4 text-gray-500 border-b hidden xl:table-cell">{campaign.recursion}</td>
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
              {expandedRow === campaign.id && (
                <tr className="bg-gray-50 md:hidden">
                  <td colSpan={8} className="py-4 px-4 text-gray-500 border-b">
                    <div className="grid grid-cols-1 gap-2">
                      <div><strong>Recipients:</strong> {formatRecipients(campaign.recipients)}</div>
                      <div><strong>Date Scheduled:</strong> {new Date(campaign.dateScheduled).toLocaleDateString()}</div>
                      <div><strong>Time Scheduled:</strong> {campaign.timeScheduled}</div>
                      <div><strong>Message Type:</strong> {campaign.messageType}</div>
                      <div><strong>Recursion:</strong> {campaign.recursion}</div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduledMessageTable;