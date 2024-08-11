import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define the props type
interface ScheduleToGroupStepperProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleToGroupStepper: React.FC<ScheduleToGroupStepperProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedSenderID, setSelectedSenderID] = useState<string>('');
  const [newSenderID, setNewSenderID] = useState<string>('');
  const [campaignTitle, setCampaignTitle] = useState<string>('');
  const [messageContent, setMessageContent] = useState<string>('');

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  const handleAddSenderID = () => {
    if (newSenderID) {
      setSelectedSenderID(newSenderID);
      setNewSenderID('');
    }
  };

  const toggleGroupSelection = (groupName: string) => {
    setSelectedGroups(prevSelectedGroups =>
      prevSelectedGroups.includes(groupName)
        ? prevSelectedGroups.filter(group => group !== groupName)
        : [...prevSelectedGroups, groupName]
    );
  };

  const handleSendMessage = () => {
    // Logic to send the message
    console.log('Message sent:', {
      selectedSenderID,
      campaignTitle,
      messageContent,
      selectedGroups,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-medium mb-6 text-black">Select Group to Send To</h2>
            <div className="mb-6">
              <div className="mb-4 flex justify-between items-center text-black">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={selectedGroups.includes('Friends')}
                    onChange={() => toggleGroupSelection('Friends')}
                  />
                  <span className="ml-2">Friends</span>
                </label>
                <span className="text-gray-600">120 members</span>
              </div>
              <div className="mb-4 flex justify-between items-center text-black">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={selectedGroups.includes('List')}
                    onChange={() => toggleGroupSelection('List')}
                  />
                  <span className="ml-2">List</span>
                </label>
                <span className="text-gray-600">85 members</span>
              </div>
              <p className="text-black text-sm mt-2">All groups loaded successfully</p>
            </div>
            <div className="flex gap-4">
              <button
                className="flex-1 bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500"
                onClick={handleNext}
                disabled={selectedGroups.length === 0}
              >
                Next
              </button>
              <button
                className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-medium mb-6 text-black">Enter Message Details</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Sender ID</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedSenderID}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedSenderID(e.target.value)}
                      className="block w-2/3 bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring focus:ring-opacity-50"
                    >
                      <option value="" disabled>Select Sender ID</option>
                      <option value="12345">12345</option>
                      <option value="67890">67890</option>
                      {/* Add more options as needed */}
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCampaignTitle(e.target.value)}
                  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring focus:ring-opacity-50"
                  placeholder="Enter Campaign Title"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Message Content</label>
                <textarea
                  value={messageContent}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessageContent(e.target.value)}
                  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring focus:ring-opacity-50"
                  placeholder="Enter your message"
                  rows={6} 
                ></textarea>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md text-sm"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-blue-400 text-white px-6 py-2 rounded-md text-sm"
                >
                  Next
                </button>
                <button
                  type="button"
                  className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-medium mb-6 text-black">Confirmation Message</h2>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Sender ID:</p>
              <p className="text-gray-800">{selectedSenderID}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Campaign Title:</p>
              <p className="text-gray-800">{campaignTitle}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Message Content:</p>
              <p className="text-gray-800">{messageContent}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Character Count:</p>
              <p className="text-gray-800">{messageContent.length} characters</p>
            </div>
            <div className="flex justify-between gap-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded-md text-sm"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm"
                onClick={handleSendMessage}
              >
                Send Message
              </button>
              <button
                type="button"
                className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md text-sm"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleToGroupStepper;
