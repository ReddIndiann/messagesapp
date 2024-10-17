'use client';

import React, { useState } from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-50'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('Overview');

  const tabs = ['Overview', 'API Reference', 'Getting Started', 'Examples'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">Overview</h2>
            <p className="text-black">This documentation provides details about the Developer API.</p>
          </div>
        );
      case 'API Reference':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">API Reference</h2>
            <ul className="list-disc pl-5 text-black">
              <li>GET /developer/send - Send a message</li>
              <li>POST /developer/schedule - Schedule a message</li>
              <li>GET /developer/getcontacts - Retrieve contacts</li>
              {/* Add more endpoints as needed */}
            </ul>
          </div>
        );
      case 'Getting Started':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">Getting Started</h2>
            <p className="text-black">To get started with the Developer API, please follow these steps:</p>
            <ol className="list-decimal pl-5 text-black">
              <li>Sign up for an API key.</li>
              <li>Set up your development environment.</li>
              <li>Make your first API request.</li>
            </ol>
          </div>
        );
      case 'Examples':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">Examples</h2>
            <p className="text-black">Here are some examples of how to use the API:</p>
            <pre className="bg-gray-100 p-4 rounded text-black">
              <code>
                {`// Example: Sending a message
const response = await fetch('/api/developer/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'YOUR_API_KEY',
  },
  body: JSON.stringify({
    senderId: '123',
    message: 'Hello, World!',
    recipients: ['+1234567890']
  })
});
`}
              </code>
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      <h1 className='text-6xl text-center mb-8 text-black hover:text-sky-500'>Documentation Page</h1>
      <div className="flex justify-center mb-6">
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
