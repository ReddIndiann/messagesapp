// pages/index.js
import React from 'react';
import Header from '@/app/Components/Header';
import Sidebar from '@/app/Components/SideNav';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          <Sidebar />
         
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
