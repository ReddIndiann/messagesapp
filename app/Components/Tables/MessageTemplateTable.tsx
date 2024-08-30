import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import TemplateMessageOptionsModal from '../Modals/MessageTemplate/SendMessageOption';
import QuickSMSModal from '../Modals/MessageTemplate/SendQuicksms';
import SendToGroupStepper from '../Modals/MessageTemplate/SendToGroupModal';
import EditTemplateModal from '../Modals/MessageTemplate/EditTemplateModal';
import { deleteTemplate } from '@/app/lib/createTemplateUtils';

// Define types for the campaign and state data
interface Campaign {
  id: number;
  title: string;
  content: string;
  messageCategory: string;
  date: string;
}

interface MessageTemplatesTableProps {
  campaigns: Campaign[];
}

const MessageTemplatesTable: React.FC<MessageTemplatesTableProps> = ({ campaigns }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isQuickSMSModalOpen, setIsQuickSMSModalOpen] = useState<boolean>(false);
  const [isSendtoGroupModalOpen, setIsSendtoGroupModalOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [quickSMSData, setQuickSMSData] = useState<{ title: string; content: string }>({ title: '', content: '' });
  const [quickGroupData, setQuickGroupData] = useState<{ title: string; content: string }>({ title: '', content: '' });

  const handleSendClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  const handleDeleteTemplate = async (campaignId: number) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await deleteTemplate(campaignId);
        // Optionally, you might want to update the campaigns state here
        // e.g., setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      } catch (err: any) {
        console.error('Error deleting template: ' + err.message);
      }
    }
  };

  const handleQuickSMSClick = (campaign: Campaign) => {
    setIsModalOpen(false); // Close the options modal if open
    setQuickSMSData({ title: campaign.title, content: campaign.content });
    setIsQuickSMSModalOpen(true); // Open the QuickSMSModal
  };

  const handleCloseQuickSMSModal = () => {
    setIsQuickSMSModalOpen(false);
  };

  const handleSendToGroupClick = (campaign: Campaign) => {
    setIsModalOpen(false); // Close the options modal if open
    setQuickGroupData({ title: campaign.title, content: campaign.content });
    setIsSendtoGroupModalOpen(true); // Open the SendToGroupStepper modal
  };

  const handleCloseSendToGroupModal = () => {
    setIsSendtoGroupModalOpen(false);
  };

  const handleEditClick = (campaign: Campaign) => {
    setIsEditOpen(true); // Open the EditTemplateModal
    setSelectedCampaign(campaign);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  return (
    <>
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
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="border-t">
              <td className="py-4 px-4 text-gray-500 border-b">{campaign.title}</td>
              <td className="py-4 px-4 text-gray-500 border-b">{campaign.content}</td>
              <td className="py-4 px-4 text-gray-500 border-b">{campaign.messageCategory}</td>
              <td className="py-4 px-4 text-gray-500 border-b">{campaign.date}</td>
              <td className="py-4 px-4 flex space-x-2 border-b">
                <button
                  title="send"
                  className="text-gray-300 text-xl"
                  onClick={() => handleSendClick(campaign)}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
                <button
                  title="edit"
                  className="text-gray-300 text-xl"
                  onClick={() => handleEditClick(campaign)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  title="delete"
                  className="text-gray-300 text-xl"
                  onClick={() => handleDeleteTemplate(campaign.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedCampaign && (
        <TemplateMessageOptionsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onQuickSMSClick={() => handleQuickSMSClick(selectedCampaign)}
          onSendToGroupClick={() => handleSendToGroupClick(selectedCampaign)}
          title={selectedCampaign.title}
          content={selectedCampaign.content}
        />
      )}
      {isEditOpen && selectedCampaign && (
        <EditTemplateModal
          isOpen={isEditOpen}
          onClose={handleCloseEdit}
          campaign={selectedCampaign}
        />
      )}

      {isQuickSMSModalOpen && (
        <QuickSMSModal
          isOpen={isQuickSMSModalOpen}
          onClose={handleCloseQuickSMSModal}
          initialTitle={quickSMSData.title}
          initialContent={quickSMSData.content}
        />
      )}

      {isSendtoGroupModalOpen && (
        <SendToGroupStepper
          isOpen={isSendtoGroupModalOpen}
          onClose={handleCloseSendToGroupModal}
          initialTitle={quickGroupData.title}
          initialContent={quickGroupData.content}
        />
      )}
    </>
  );
};

export default MessageTemplatesTable;
