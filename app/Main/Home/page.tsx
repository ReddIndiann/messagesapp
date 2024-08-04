import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="BMS Logo" className="h-8 w-auto mr-2" />
            <span className="font-bold text-lg">Bulk Messaging Solutions</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="block">SMS Balance</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="text-sm">
              <span className="block">Bonus</span>
              <span className="font-semibold text-red-500">407</span>
              <span className="text-xs text-gray-500">Expires on 2024-09-01</span>
            </div>
            <button className="bg-gray-200 rounded-full p-1">
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="text-sm font-semibold">Daniel Odoi ▼</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 pr-8">
            <nav className="space-y-2">
              <Link href="#" className="block py-2 px-4 bg-orange-100 text-orange-600 rounded">Overview</Link>
              <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Send Message</Link>
              <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Contacts</Link>
              <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Birthday App</Link>
              <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">
                Wallet <span className="inline-block bg-green-500 text-white text-xs px-2 rounded-full ml-2">GHS 0.00</span>
              </Link>
              <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Campaign History</Link>
              <Link href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Get Help</Link>
            </nav>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Switch Channel</h3>
              <div className="mt-2 space-y-2">
                <button className="flex items-center space-x-2 text-orange-600 bg-orange-100 px-4 py-2 rounded-md w-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Bulk SMS</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md w-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Bulk Voice Calls</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-red-500 text-sm mb-4">Overview page displays data from the past 3 days.</p>
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-700">2</div>
                  <div className="text-sm text-gray-500">Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-700">0</div>
                  <div className="text-sm text-gray-500">Contacts</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-700">1</div>
                  <div className="text-sm text-gray-500">Groups</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-700">3</div>
                  <div className="text-sm text-gray-500">Credit Used</div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Billing Summary</h3>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span>Credit Used</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                    <span>Recipient</span>
                  </div>
                </div>
                <div className="bg-gray-200 h-64 rounded-lg"></div>
                <div className="text-center mt-2 text-sm text-gray-500">August 2, 2024</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Sender ID</h3>
                <div className="flex justify-between items-center">
                  <div>Daniel</div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Add Sender ID</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;