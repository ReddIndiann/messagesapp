import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Define interfaces for props and state
interface FormData {
  selectedSenderID: string;
  newSenderID: string;
  campaignTitle: string;
  messageContent: string;
  recipients: string;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

interface Step1Props {
  onNext: () => void;
  onDataChange: (newData: Partial<FormData>) => void;
}

interface Step2Props {
  onNext: () => void;
  onPrevious: () => void;
  onDataChange: (newData: Partial<FormData>) => void;
  formData: FormData;
}

interface ConfirmationMessageModalProps {
  onClose: () => void;
  formData: FormData;
  onSend: () => void;
}

interface QuickSMSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Step Indicator Component
const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => (
  <div className="flex justify-between items-center mb-8">
    {[...Array(totalSteps)].map((_, index) => (
      <React.Fragment key={index}>
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              index + 1 <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {index + 1}
          </div>
          <span className="mt-2 text-xs text-gray-500">
            {index === 0 ? 'Select' : index === 1 ? 'Compose' : 'Confirm'}
          </span>
        </div>
        {index < totalSteps - 1 && (
          <div
            className={`flex-1 h-1 ${
              index + 1 < currentStep ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          ></div>
        )}
      </React.Fragment>
    ))}
  </div>
);

// Step 1 Component
const Step1: React.FC<Step1Props> = ({ onNext, onDataChange }) => {
  const [recipient, setRecipient] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDataChange({ recipients: recipient });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Recipient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
          <textarea
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
            placeholder="Enter recipient's number or select from contacts"
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          Next: Compose Message
        </button>
      </form>
    </motion.div>
  );
};

// Step 2 Component
const Step2: React.FC<Step2Props> = ({ onNext, onPrevious, onDataChange, formData }) => {
  const { selectedSenderID, newSenderID, campaignTitle, messageContent } = formData;

  const handleAddSenderID = () => {
    if (newSenderID) {
      onDataChange({ selectedSenderID: newSenderID, newSenderID: '' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Compose Message</h2>
      <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="mb-6">
          <label htmlFor="senderID" className="block text-sm font-medium text-gray-700 mb-2">Sender ID</label>
          <div className="flex items-center gap-2">
            <select
              id="senderID"
              value={selectedSenderID}
              onChange={(e) => onDataChange({ selectedSenderID: e.target.value })}
              className="flex-1 bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            >
              <option value="" disabled>Select Sender ID</option>
              <option value="12345">12345</option>
              <option value="67890">67890</option>
            </select>
            <button
              type="button"
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
              onClick={handleAddSenderID}
            >
              Add New
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="campaignTitle" className="block text-sm font-medium text-gray-700 mb-2">Campaign Title</label>
          <input
            id="campaignTitle"
            type="text"
            value={campaignTitle}
            onChange={(e) => onDataChange({ campaignTitle: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter Campaign Title"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
          <textarea
            id="messageContent"
            value={messageContent}
            onChange={(e) => onDataChange({ messageContent: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
            placeholder="Enter your message"
            rows={6}
            required
          ></textarea>
          <p className="mt-2 text-sm text-gray-500">
            Characters: {messageContent.length} / 160
          </p>
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            onClick={onPrevious}
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Next: Confirm
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Confirmation Message Modal Component
const ConfirmationMessageModal: React.FC<ConfirmationMessageModalProps> = ({ onClose, formData, onSend }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
  >
    <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg relative">
      <button
        title='close'
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Confirm and Send</h2>
      <p className="text-gray-700 mb-4">
        Are you sure you want to send the following message?
      </p>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800">Message Details</h3>
        <p className="text-gray-700 mt-2"><strong>Recipient:</strong> {formData.recipients}</p>
        <p className="text-gray-700 mt-2"><strong>Sender ID:</strong> {formData.selectedSenderID}</p>
        <p className="text-gray-700 mt-2"><strong>Campaign Title:</strong> {formData.campaignTitle}</p>
        <p className="text-gray-700 mt-2"><strong>Message Content:</strong></p>
        <p className="text-gray-700">{formData.messageContent}</p>
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
          onClick={onClose}
        >
          Back
        </button>
        <button
          type="button"
          className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          onClick={onSend}
        >
          Send
        </button>
      </div>
    </div>
  </motion.div>
);

// Main Modal Component
const QuickSMSModal: React.FC<QuickSMSModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    selectedSenderID: '',
    newSenderID: '',
    campaignTitle: '',
    messageContent: '',
    recipients: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handleDataChange = (newData: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  const handleNext = () => setCurrentStep(prevStep => prevStep + 1);
  const handlePrevious = () => setCurrentStep(prevStep => prevStep - 1);

  const handleSend = async () => {
    try {
      const payload = {
        recipients: formData.recipients,
        senderId: formData.selectedSenderID || 5,
        userId: 5, // Replace with dynamic user ID if necessary
        content: formData.messageContent,
        messageType: 'text',
        recursion: 'none',
      };

      const response = await axios.post('http://localhost:5000/send-messages/create', payload);

      if (response.status === 200) {
        console.log('SMS sent successfully:', response.data);
        setShowSuccessModal(true);
      } else {
        console.error('Failed to send SMS:', response.data);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose(); // Close the QuickSMSModal
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg">
              <StepIndicator currentStep={currentStep} totalSteps={3} />
              <div className="p-8">
                <AnimatePresence>
                  {currentStep === 1 && (
                    <Step1 onNext={handleNext} onDataChange={handleDataChange} />
                  )}
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
                      onClose={onClose}
                      formData={formData}
                      onSend={handleSend}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10">
                <h2 className="text-xl font-medium text-green-600">Success!</h2>
                <p className="text-gray-700">Message sent successfully.</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
                    onClick={handleCloseSuccessModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickSMSModal;
