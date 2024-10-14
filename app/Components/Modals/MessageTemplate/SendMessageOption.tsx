import React from 'react';


interface TemplateMessageOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickSMSClick: () => void;
  onSendToGroupClick: () => void;
  onExportClick: () => void;
  title: string; // Add title prop
  content: string; // Add content prop
}

const TemplateMessageOptionsModal: React.FC<TemplateMessageOptionsModalProps> = ({
  isOpen,
  onClose,
  onQuickSMSClick,
  onSendToGroupClick,
  onExportClick,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <h2 className="text-lg sm:text-xl font-medium mb-4 text-black">Send Message</h2>
        {/* <p className="mb-4 text-black text-xs sm:text-sm">Title: {title}</p>
        <p className="mb-4 text-black text-xs sm:text-sm">Content: {content}</p> */}
        <p className="mb-4 text-black text-xs sm:text-sm">What action do you want to perform on your message?</p>
        <button
          className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-blue-100 hover:text-blue-400 text-sm sm:text-base"
          onClick={() => {
            onClose();
            onQuickSMSClick();
          }}
        >
          Quick SMS
        </button>
        <button
          className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-blue-100 hover:text-blue-400 text-sm sm:text-base"
          onClick={() => {
            onClose();
            onSendToGroupClick();
          }}
        >
          Send to Group
        </button>
        <button
          className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-blue-100 hover:text-blue-400 text-sm sm:text-base"
          onClick={() => {
            onClose();
          onExportClick();
          }}
        >
          Send using Excel Sheet
        </button>
        <button
          className="w-full sm:w-24 bg-gray-100 text-gray-800 py-2 mt-4 sm:mt-5 rounded text-sm sm:text-base"
          
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TemplateMessageOptionsModal;
