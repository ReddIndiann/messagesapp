// components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/bms.png" alt="BMS Logo" className="h-16 w-auto mr-2" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-center pr-2">
            <div className="text-sm">
              <span className="block text-xs text-gray-500 font-semibold">SMS Balance</span>
              <span className=" text-gray-500">0</span>
            </div>
          </div>
          <div className="text-center  pr-2">
            <div className="text-sm">
              <span className="block text-xs text-gray-500 font-semibold mb-1">Bonus</span>
              <span className="font-semibold  bg-red-500 rounded-full px-8 py-1 mb-1">407</span>
              <span className="block text-sm text-red-500">Expires on 2024-09-01</span>
            </div>
          </div>
          <button className="bg-red-500 rounded-full p-1">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <div className="text-sm font-semibold flex items-center text-gray-500">
            Daniel Odoi
            <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
