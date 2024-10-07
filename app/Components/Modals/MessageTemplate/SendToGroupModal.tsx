import React, { useState, useEffect, useCallback } from 'react';
import { fetchGroups, Group } from '@/app/lib/grouputil';
import axios from 'axios';
import { fetchSenderIds } from '@/app/lib/senderIdUtils';

interface SendToGroupStepperProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialContent: string;
}

const SendToGroupStepper: React.FC<SendToGroupStepperProps> = ({ isOpen, onClose, initialTitle, initialContent }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedSenderID, setSelectedSenderID] = useState('');
  const [newSenderID, setNewSenderID] = useState('');
  const [campaignTitle, setCampaignTitle] = useState(initialTitle);
  const [messageContent, setMessageContent] = useState(initialContent);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [senders, setSenders] = useState<{ id: string; name: string }[]>([]);
  const [userId, setUserId] = useState<number | null>(null);


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
  useEffect(() => {
    if (userId) {
      const getSenderIds = async () => {
        try {
          const data = await fetchSenderIds(userId);
          setSenders(data.map((sender: any) => ({ id: sender.id, name: sender.name })));
        } catch (error) {
          console.error('Error fetching sender IDs:', error);
        }
      };

      getSenderIds();
    }
  }, [userId]);
  const handleNext = useCallback(() => setStep((prevStep) => prevStep + 1), []);
  const handlePrevious = useCallback(() => setStep((prevStep) => prevStep - 1), []);

  const toggleGroupSelection = useCallback((groupName: string) => {
    setSelectedGroups((prevSelectedGroups) =>
      prevSelectedGroups.includes(groupName)
        ? prevSelectedGroups.filter((group) => group !== groupName)
        : [...prevSelectedGroups, groupName]
    );
  }, []);

  const handleSendMessage = useCallback(async () => {
    const recipients: string[] = selectedGroups.flatMap((groupName) => {
      const group = groups.find((g) => g.groupName === groupName);
      return group?.contacts.map((contact: any) => contact.phone) || [];
    });

    const payload = {
      senderId: selectedSenderID,
      userId: userId,
      campaignTitle,
      content: messageContent,
      messageType: 'text',
      recursion: 'none',
      recipients,
    };

    try {
      await axios.post('http://localhost:5000/send-messages/create', payload);
      console.log('Message sent successfully:', payload);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        onClose();
      }, 2000);
    } catch (error) {
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
  }, [selectedGroups, groups, campaignTitle, messageContent, selectedSenderID, userId, onClose]);

  const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = React.memo(({ currentStep, totalSteps }) => (
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
  ));

  StepIndicator.displayName = 'StepIndicator';

  const Step1: React.FC = React.memo(() => (
    <div>
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
            <span className="text-gray-600">{group.contacts.length} members</span>
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
    </div>
  ));

  Step1.displayName = 'Step1';

  const Step2: React.FC = React.memo(() => {
    const [localSenderID, setLocalSenderID] = useState(selectedSenderID);
    const [localCampaignTitle, setLocalCampaignTitle] = useState(campaignTitle);
    const [localMessageContent, setLocalMessageContent] = useState(messageContent);
  
    // Sync the local state with props
    useEffect(() => {
      setLocalSenderID(selectedSenderID);
    }, [selectedSenderID]);
  
    const handleAddSenderID = () => {
      if (newSenderID) {
        setSelectedSenderID(newSenderID);
        setNewSenderID('');
      }
    };
  
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Compose Message</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className="mb-6">
            <label htmlFor="senderID" className="block text-sm font-medium text-gray-700 mb-2">Sender ID</label>
            <div className="flex items-center gap-2">
            <select
              id="selectedSenderID"
              value={selectedSenderID}
              onChange={(e) => setSelectedSenderID(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
              required
            >
              <option value="" disabled>Select Sender ID</option>
              {senders.length > 0 ? (
                senders.map((sender) => (
                  <option key={sender.id} value={sender.id}>
                    {sender.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No Sender IDs available</option>
              )}
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
              value={localCampaignTitle}
              onChange={(e) => setLocalCampaignTitle(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter Campaign Title"
              required
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
            <textarea
              id="messageContent"
              value={localMessageContent}
              onChange={(e) => setLocalMessageContent(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
              placeholder="Enter your message"
              rows={6}
              required
            ></textarea>
            <p className="mt-2 text-sm text-gray-600">Max 160 characters</p>
          </div>
  
          <div className="flex justify-between gap-4">
            <button
              type="button"
              className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors duration-200"
              onClick={handlePrevious}
            >
              Back
            </button>
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
              onClick={() => {
                setSelectedSenderID(localSenderID);
                setCampaignTitle(localCampaignTitle);
                setMessageContent(localMessageContent);
                handleNext();
              }}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    );
  });
  
  Step2.displayName = 'Step2';

  const ConfirmationStep: React.FC = React.memo(() => (
    
    <div>
      
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Confirm Your Message</h2>
      <div className="mb-4">
        <p className="text-lg font-medium">Selected Groups:</p>
        <ul className="list-disc pl-5">
          {selectedGroups.map((group, index) => (
            <li key={index} className="text-gray-700">{group}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium">Sender ID:</p>
        <p className="text-gray-700">{selectedSenderID}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium">Campaign Title:</p>
        <p className="text-gray-700">{campaignTitle}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium">Message Content:</p>
        <p className="text-gray-700">{messageContent}</p>
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors duration-200"
          onClick={handlePrevious}
        >
          Back
        </button>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          onClick={handleSendMessage}
        >
          Send Message
        </button>
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
  ));

  ConfirmationStep.displayName = 'ConfirmationStep';

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Send to Group</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
              </button>
            </div>
            <StepIndicator currentStep={step} totalSteps={3} />
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <ConfirmationStep />}
          </div>
        </div>
      )}
    </>
  );
};

export default SendToGroupStepper;
