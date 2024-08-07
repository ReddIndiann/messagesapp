// components/CreateTemplateModal.js
'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CreateTemplateModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl"> {/* Responsive max-width */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-600">Create a Template</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
              rows="4"
              placeholder="Enter the message content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <div className="mt-2 flex items-center">
              <input type="checkbox" id="gsmOnly" className="mr-2" />
              <label htmlFor="gsmOnly" className="text-sm text-gray-600">Use GSM Only</label>
            </div>
            <p className="text-sm text-gray-500 mt-2">0 characters entered</p>
          </div>
          <div className="mb-4 md:mb-6">
            <label className="block text-sm font-medium text-gray-700">Message Category</label>
            <select
              className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 md:p-3 focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50 text-gray-800 hover:bg-gray-200"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Please select a message category</option>
              <option value="sms">SMS</option>
              <option value="birthday">Birthday</option>
              <option value="international">International</option>
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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateModal;
