import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Define the types for the form data
interface FormData {
  selectedSenderID: string;
  newSenderID: string;
  campaignTitle: string;
  messageContent: string;
}

// Define the props for Step1 component
interface Step1Props {
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => (
  <div>
    <h2 className="text-lg sm:text-2xl font-semibold mb-4 text-gray-500">Select Individual</h2>
    <form>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Recipient</label>
        <textarea
  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-opacity-50 text-gray-800"
  placeholder="Enter your message"
  rows={6}  // Changed from rows="6" to rows={6}
></textarea>

      </div>
      <button
        type="button"
        className="bg-blue-400 text-white px-6 py-2 rounded-md text-sm"
        onClick={onNext}
      >
        Next
      </button>
    </form>
  </div>
);

// Define the props for Step2 component
interface Step2Props {
  onNext: () => void;
  onPrevious: () => void;
  onDataChange: (newData: Partial<FormData>) => void;
  formData: FormData;
}

const Step2: React.FC<Step2Props> = ({ onNext, onPrevious, onDataChange, formData }) => {
  const { selectedSenderID, newSenderID, campaignTitle, messageContent } = formData;

  const handleAddSenderID = () => {
    if (newSenderID) {
      onDataChange({ selectedSenderID: newSenderID, newSenderID: '' });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 text-black">Enter Message Details</h2>
      <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Sender ID</label>
            <div className="flex items-center gap-2">
              <select
                value={selectedSenderID}
                onChange={(e) => onDataChange({ selectedSenderID: e.target.value })}
                className="block w-2/3 bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring focus:ring-opacity-50"
              >
                <option value="" disabled>Select Sender ID</option>
                <option value="12345">12345</option>
                <option value="67890">67890</option>
              </select>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md text-sm"
                onClick={handleAddSenderID}
              >
                Add Sender ID
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Campaign Title</label>
          <input
            type="text"
            value={campaignTitle}
            onChange={(e) => onDataChange({ campaignTitle: e.target.value })}
            className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring focus:ring-opacity-50"
            placeholder="Enter Campaign Title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Message Content</label>
          <textarea
  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-3 focus:ring focus:ring-opacity-50 text-gray-800"
  placeholder="Enter your message"
  rows={6}  // Changed from rows="6" to rows={6}
></textarea>

        </div>
        <div className="flex justify-between gap-4">
          <button
            type="button"
            className="bg-gray-200 text-gray-500 px-6 py-2 rounded-md text-sm"
            onClick={onPrevious}
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-blue-400 text-white px-6 py-2 rounded-md text-sm"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

// Define the props for ConfirmationMessageModal component
interface ConfirmationMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
}

const ConfirmationMessageModal: React.FC<ConfirmationMessageModalProps> = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null;

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 text-black">Confirmation Message</h2>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Sender ID:</p>
        <p className="text-gray-800">{formData.selectedSenderID}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Campaign Title:</p>
        <p className="text-gray-800">{formData.campaignTitle}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Message Content:</p>
        <p className="text-gray-800">{formData.messageContent}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Character Count:</p>
        <p className="text-gray-800">{formData.messageContent.length} characters</p>
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-6 py-2 rounded-md text-sm"
          onClick={onClose}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

// Define the props for ScheduleQuickSms component
interface ScheduleQuickSmsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleQuickSms: React.FC<ScheduleQuickSmsProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    selectedSenderID: '',
    newSenderID: '',
    campaignTitle: '',
    messageContent: '',
  });

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleDataChange = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {/* Step Content */}
        {currentStep === 1 && <Step1 onNext={handleNext} />}
        {currentStep === 2 && (
          <Step2
            onNext={handleNext}
            onPrevious={handlePrevious}
            onDataChange={handleDataChange}
            formData={formData}
          />
        )}
        {currentStep === 3 && (
          <ConfirmationMessageModal
            isOpen={true}
            onClose={onClose}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleQuickSms;
