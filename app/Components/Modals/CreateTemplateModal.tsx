import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createTemplate } from '@/app/lib/createTemplateUtils';
// import Cookies from 'js-cookie';
interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [gsmOnly, setGsmOnly] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Retrieve and parse the user ID from async storage
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCharCount(newContent.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTemplate(title, content, category, userId);

      // Reset form fields
      setTitle('');
      setContent('');
      setCategory('');
      setGsmOnly(false);

      // Close the main modal
      onClose();

      // Show the success modal
      setShowSuccessModal(true);

      // Auto-hide the success modal after a delay
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);

    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  return (
    <>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-medium text-green-600">Success!</h2>
            <p className="text-gray-700">Template created successfully.</p>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-600">Create a Template</h2>
              <button aria-label="create template button" title="create template button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 md:p-3 focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50 text-gray-800"
                  placeholder="Enter the title of the message"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 md:p-3 focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50 text-gray-800"
                  rows={4}
                  placeholder="Enter the message content"
                  value={content}
                  onChange={handleContentChange}
                  required
                ></textarea>
                <div className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    id="gsmOnly"
                    className="mr-2"
                    checked={gsmOnly}
                    onChange={(e) => setGsmOnly(e.target.checked)}
                  />
                  <label htmlFor="gsmOnly" className="text-sm text-gray-600">Use GSM Only</label>
                </div>
                <p className="text-sm text-gray-500 mt-2">{charCount} characters entered</p>
              </div>
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700">Message Category</label>
                <select
                  aria-label="category select"
                  title="category select"
                  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 md:p-3 focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50 text-gray-800 hover:bg-gray-200"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Please select a message category</option>
                  <option value="sms">SMS</option>
                  <option value="birthday">Birthday</option>
                  <option value="international">International</option>
                  <option value="onboarding">Onboarding</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 md:space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTemplateModal;
