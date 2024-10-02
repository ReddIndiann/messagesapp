import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface FormData {
  selectedSenderID: string;
  newSenderID: string;
  campaignTitle: string;
  messageContent: string;
  recipients: string[];
}

interface QuickSMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialContent: string;
}

const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => (
  <div className="flex justify-between items-center mb-6">
    {[...Array(totalSteps)].map((_, index) => (
      <React.Fragment key={index}>
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
            index + 1 <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {index + 1}
          </div>
          <span className="mt-1 text-xs text-gray-500">
            {index === 0 ? 'Select' : index === 1 ? 'Compose' : 'Confirm'}
          </span>
        </div>
        {index < totalSteps - 1 && (
          <div className={`flex-1 h-0.5 ${index + 1 < currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        )}
      </React.Fragment>
    ))}
  </div>
);

const CloseButton: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <button
    onClick={onClose}
    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
    aria-label="Close"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  </button>
);

const Step1: React.FC<{ onNext: (data: Partial<FormData>) => void; onClose: () => void }> = ({ onNext, onClose }) => {
  const [recipientInput, setRecipientInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipientsArray = recipientInput.split(',').map(recipient => recipient.trim()).filter(recipient => recipient !== '');
    onNext({ recipients: recipientsArray });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Recipient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
          <textarea
            id="recipient"
            value={recipientInput}
            onChange={(e) => setRecipientInput(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
            placeholder="Enter recipient numbers separated by commas"
            rows={3}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          Next: Compose Message
        </button>
      </form>
    </motion.div>
  );
};

const Step2: React.FC<{ onNext: (data: Partial<FormData>) => void; onPrevious: () => void; formData: FormData; onClose: () => void }> = ({ onNext, onPrevious, formData, onClose }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setLocalFormData({ ...localFormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(localFormData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Compose Message</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="selectedSenderID" className="block text-sm font-medium text-gray-700 mb-1">Sender ID</label>
          <select
            id="selectedSenderID"
            value={localFormData.selectedSenderID}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
            required
          >
            <option value="" disabled>Select Sender ID</option>
            <option value="12345">12345</option>
            <option value="67890">67890</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="campaignTitle" className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
          <input
            id="campaignTitle"
            type="text"
            value={localFormData.campaignTitle}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
            placeholder="Enter Campaign Title"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
          <textarea
            id="messageContent"
            value={localFormData.messageContent}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
            placeholder="Enter your message"
            rows={4}
            required
          ></textarea>
          <p className="mt-1 text-xs text-gray-500">
            Characters: {localFormData.messageContent.length} / 160
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <button
            type="button"
            onClick={onPrevious}
            className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Next: Confirm
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const Step3: React.FC<{ formData: FormData; onPrevious: () => void; onSend: () => void; onClose: () => void }> = ({ formData, onPrevious, onSend, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="relative"
  >
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm and Send</h2>
    <div className="space-y-2 mb-4">
      <p className="text-sm text-gray-800"><strong>Recipient:</strong> {formData.recipients.join(', ')}</p>
      <p className="text-sm text-gray-800"><strong>Sender ID:</strong> {formData.selectedSenderID || 'Not Selected'}</p>
      <p className="text-sm text-gray-800"><strong>Campaign Title:</strong> {formData.campaignTitle}</p>
      <p className="text-sm text-gray-800"><strong>Message Content:</strong> {formData.messageContent}</p>
    </div>
    <div className="flex justify-between gap-3">
      <button
        type="button"
        onClick={onPrevious}
        className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onSend}
        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
      >
        Send
      </button>
    </div>
  </motion.div>
);

const QuickSMSModal: React.FC<QuickSMSModalProps> = ({ isOpen, onClose, initialTitle, initialContent }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    selectedSenderID: '',
    newSenderID: '',
    campaignTitle: initialTitle,
    messageContent: initialContent,
    recipients: [],
  });
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useRouter();

  const handleNext = (data: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSend = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-messages/create', {
        recipients: formData.recipients,
        senderId: 1,
        userId: 1,
        content: formData.messageContent,
        messageType: 'text',
        recursion: 'none',
      });

      console.log('Message sent successfully:', response.data);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        onClose();
      }, 2000);
      navigate.push('/Sms/CampaignHistory');
    } catch (error) {
      console.error('Error sending SMS:', error);
      let errorMessage = 'An unexpected error occurred.';

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || 'An error occurred while sending the message.';
      }

      setShowErrorModal(true);
      setErrorMessage(errorMessage);

      setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <CloseButton onClose={onClose} />
            <StepIndicator currentStep={currentStep} totalSteps={3} />
            <AnimatePresence>
              {currentStep === 1 && <Step1 onNext={handleNext} onClose={onClose} />}
              {currentStep === 2 && <Step2 onNext={handleNext} onPrevious={handlePrevious} formData={formData} onClose={onClose} />}
              {currentStep === 3 && <Step3 formData={formData} onPrevious={handlePrevious} onSend={handleSend} onClose={onClose} />}
            </AnimatePresence>
            {showSuccessModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-medium text-green-600">Success!</h2>
                  <p className="text-gray-700">Message Sent successfully.</p>
                </div>
              </div>
            )}
            {showErrorModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-medium text-red-600">Error!</h2>
                  <p className="text-gray-700">{errorMessage}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default QuickSMSModal;
