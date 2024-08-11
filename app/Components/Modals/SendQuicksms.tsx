import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StepIndicator = ({ currentStep, totalSteps }) => {
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
};

const Step1 = ({ onNext }) => (
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

const Step2 = ({ onNext, onPrevious, onDataChange, formData }) => {
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

const ConfirmationMessageModal = ({ onClose, formData, onSend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Confirm Message</h2>
        <div className="space-y-4">
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
        <div className="flex justify-between gap-4 mt-8">
          <button
            type="button"
            className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            onClick={onClose}
          >
            Edit Message
          </button>
          <button
            type="button"
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
            onClick={onSend}
          >
            Send Message
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const QuickSMSModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedSenderID: '',
    newSenderID: '',
    campaignTitle: '',
    messageContent: '',
  });

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);
  const handleDataChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSend = () => {
    // Implement the logic to send the SMS
    console.log('Sending SMS:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        <AnimatePresence mode="wait">
          {currentStep === 1 && <Step1 key="step1" onNext={handleNext} />}
          {currentStep === 2 && (
            <Step2
              key="step2"
              onNext={handleNext}
              onPrevious={handlePrevious}
              onDataChange={handleDataChange}
              formData={formData}
            />
          )}
          {currentStep === 3 && (
            <ConfirmationMessageModal
              key="step3"
              onClose={() => setCurrentStep(2)}
              formData={formData}
              onSend={handleSend}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuickSMSModal;