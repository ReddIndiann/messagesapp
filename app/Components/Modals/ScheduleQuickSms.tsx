import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


interface FormData {
  selectedSenderID: string;
  newSenderID: string;
  campaignTitle: string;
  messageContent: string;
  scheduledDate: string;
  scheduledTime: string;
  recipients: string;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
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
              {index === 0 ? 'Select' : index === 1 ? 'Compose' : 'Schedule'}
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
};

interface Step1Props {
  onNext: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step1: React.FC<Step1Props> = ({ onNext, formData, setFormData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Recipient</h2>
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <div className="mb-6">
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
        <textarea
          id="recipient"
          value={formData.recipients}
          onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
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


interface Step2Props {
  onNext: () => void;
  onPrevious: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step2: React.FC<Step2Props> = ({ onNext, onPrevious, formData, setFormData }) => {
  const handleAddSenderID = () => {
    if (formData.newSenderID) {
      setFormData({
        ...formData,
        selectedSenderID: formData.newSenderID,
        newSenderID: '',
      });
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
              value={formData.selectedSenderID}
              onChange={(e) => setFormData({ ...formData, selectedSenderID: e.target.value })}
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
            value={formData.campaignTitle}
            onChange={(e) => setFormData({ ...formData, campaignTitle: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter Campaign Title"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
          <textarea
            id="messageContent"
            value={formData.messageContent}
            onChange={(e) => setFormData({ ...formData, messageContent: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
            placeholder="Enter your message"
            rows={6}
            required
          ></textarea>
          <p className="mt-2 text-sm text-gray-500">
            Characters: {formData.messageContent.length} / 160
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
            Next: Schedule
          </button>
        </div>
      </form>
    </motion.div>
  );
};

interface Step3Props {
  onPrevious: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSchedule: () => void;
}

const Step3: React.FC<Step3Props> = ({ onPrevious, formData, setFormData, onSchedule }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Schedule Message</h2>
    <form onSubmit={(e) => { e.preventDefault(); onSchedule(); }}>
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Sender ID</p>
          <p className="text-lg text-gray-800">{formData.selectedSenderID}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Campaign Title</p>
          <p className="text-lg text-gray-800">{formData.campaignTitle}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Message Content</p>
          <p className="text-lg text-gray-800">{formData.messageContent}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Character Count</p>
          <p className="text-lg text-gray-800">{formData.messageContent.length} / 160</p>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
        <div className="relative">
          <input
            id="scheduledDate"
            type="date"
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
         
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time</label>
        <input
          id="scheduledTime"
          type="time"
          value={formData.scheduledTime}
          onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          required
        />
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
          Schedule Message
        </button>
      </div>
    </form>
  </motion.div>
);

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
    scheduledDate: '',
    scheduledTime: '',
    recipients:''
  });
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);


  const handleSchedule = async () => {
    const payload = {
      recipients: formData.recipients.split(',').map(recipient => recipient.trim()),
      senderId: 1,
      userId: 2,
      campaignTitle: formData.campaignTitle,
      content: formData.messageContent,
      messageType: "text",
      recursion: "none",
      dateScheduled: formData.scheduledDate,
      timeScheduled: formData.scheduledTime,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/schedule-messages/create', payload);
      console.log('Message scheduled successfully:', response.data);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error scheduling message:', error);
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
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative">
        <button
          aria-label="Close"
          title="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose} // Ensure this is correctly wired to the onClose function
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        <AnimatePresence mode="wait">
          {currentStep === 1 && <Step1 key="step1" onNext={handleNext} formData={formData} setFormData={setFormData} />
        }
          {currentStep === 2 && (
            <Step2
              key="step2"
              onNext={handleNext}
              onPrevious={handlePrevious}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 3 && (
            <Step3
              key="step3"
              onPrevious={handlePrevious}
              formData={formData}
              setFormData={setFormData}
              onSchedule={handleSchedule}
            />
          )}
        </AnimatePresence>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-medium text-green-600">Success!</h2>
            <p className="text-gray-700">Sender ID registered successfully.</p>
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
  );
};

export default ScheduleQuickSms;