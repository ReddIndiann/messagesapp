// SendToGroupStepper.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGroups,Group } from '@/app/lib/grouputil';

interface SendToGroupStepperProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormDataState {
  selectedSenderID: string;
  newSenderID: string;
  campaignTitle: string;
  messageContent: string;
}

const SendToGroupStepper: React.FC<SendToGroupStepperProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [formData, setFormData] = useState<FormDataState>({
    selectedSenderID: '',
    newSenderID: '',
    campaignTitle: '',
    messageContent: '',
  });

  useEffect(() => {
    const fetchUserGroups = async () => {
      const signInResponse = localStorage.getItem('signInResponse');
      if (signInResponse) {
        const parsedResponse = JSON.parse(signInResponse);
        const userId = parsedResponse.user?.id;
        if (userId) {
          try {
            const fetchedGroups = await fetchGroups(userId);
            setGroups(fetchedGroups);
          } catch (error) {
            console.error('Error fetching groups:', error);
          }
        }
      }
    };

    fetchUserGroups();
  }, []);

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handlePrevious = () => setStep((prevStep) => prevStep - 1);

  const toggleGroupSelection = (groupName: string) => {
    setSelectedGroups((prevSelectedGroups) =>
      prevSelectedGroups.includes(groupName)
        ? prevSelectedGroups.filter((group) => group !== groupName)
        : [...prevSelectedGroups, groupName]
    );
  };

  const handleSendMessage = () => {
    console.log('Message sent:', {
      ...formData,
      selectedGroups,
    });
    onClose();
  };

  const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => (
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

  const Step1: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Groups to Send To</h2>
      <div className="mb-6 space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="flex justify-between items-center text-gray-800">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                checked={selectedGroups.includes(group.groupName)}
                onChange={() => toggleGroupSelection(group.groupName)}
              />
              <span className="ml-2">{group.groupName}</span>
            </label>
            <span className="text-gray-600">{group.memberCount} members</span>
          </div>
        ))}
        {groups.length === 0 && <p className="text-gray-600 text-sm mt-2">No groups found. Please create a group first.</p>}
        {groups.length > 0 && <p className="text-gray-600 text-sm mt-2">All groups loaded successfully</p>}
      </div>
      <button
        className="w-full bg-blue-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
        onClick={handleNext}
        disabled={selectedGroups.length === 0}
      >
        Next: Compose Message
      </button>
    </motion.div>
  );

  const Step2: React.FC = () => {
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
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
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
              onClick={handlePrevious}
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

  const Step3: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Confirm Message</h2>
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
        <div>
          <p className="text-sm font-medium text-gray-500">Selected Groups</p>
          <p className="text-lg text-gray-800">{selectedGroups.join(', ')}</p>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
          onClick={handlePrevious}
        >
          Edit Message
        </button>
        <button
          type="button"
          className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          onClick={handleSendMessage}
        >
          Send Message
        </button>
      </div>
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl relative">
        <button
          title='close'
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <StepIndicator currentStep={step} totalSteps={3} />
        <AnimatePresence mode="wait">
          {step === 1 && <Step1 key="step1" />}
          {step === 2 && <Step2 key="step2" />}
          {step === 3 && <Step3 key="step3" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SendToGroupStepper;