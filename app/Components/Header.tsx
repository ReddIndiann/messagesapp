import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteAuthCookie } from '../lib/storage';
import { fetchUserById } from '../lib/userlib';
import Swal from 'sweetalert2';

interface HeaderProps {
  currentSection: 'bulkSMS' | 'Developer' | 'admin';
}

const Header: React.FC<HeaderProps> = ({ currentSection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [combinedCredit, setCombinedCredit] = useState<number | null>(null);
  const [bonusCredit, setBonusCredit] = useState<number | null>(null);
  const [bonusExpiry, setBonusExpiry] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch userId from localStorage on component mount
  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

  // Fetch credit balances using the new endpoint
  useEffect(() => {
    const fetchCreditData = async () => {
      if (userId) {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/auth/${userId}`);
          const data = await response.json();

          // Validate and set SMS balance and bonus balance
          setCombinedCredit(typeof data.totalMainBalance === 'number' ? data.totalMainBalance : 0);
          setBonusCredit(typeof data.bonusbalance === 'number' ? data.bonusbalance : 0);
          setBonusExpiry('2024-11-01'); // Set actual expiry if available
        } catch (error) {
          console.error('Error fetching bundle data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCreditData();
  }, [userId]);

  // Fetch username
  useEffect(() => {
    const loadUserData = async () => {
      if (userId !== null) {
        try {
          const userData = await fetchUserById(userId);

          if (userData) {
            setUsername(userData.username || null);
            console.log('Extracted Username:', userData.username);
          } else {
            // Show SweetAlert if no user data exists and log out
            await Swal.fire({
              title: 'Session Expired',
              text: 'No user found. You will be logged out.',
              icon: 'warning',
              confirmButtonText: 'OK',
            });
            await handleLogout();
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    loadUserData();
  }, [userId]);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    await deleteAuthCookie();
    localStorage.clear(); // Clear all localStorage data
    router.push('/');
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="max-w-full sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <div className="flex items-center flex-grow">
          <img src="/logo1.png" alt="BMS Logo" className="h-12 w-auto sm:h-16 mr-2" />
        </div>
        <div className="flex items-center space-x-4">
          {currentSection === 'bulkSMS' && (
            <>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-center pr-2 hidden sm:block">
                <div className="text-sm">
                  <span className="block text-xs text-gray-500 font-semibold">SMS Balance</span>
                  <span className="text-gray-500">{combinedCredit !== null ? combinedCredit.toFixed(0) : '0'}</span>
                </div>
              </div>
              <div className="text-center pr-2 hidden sm:block">
                <div className="text-sm">
                  <span className="block text-xs text-gray-500 font-semibold mb-1">Bonus</span>
                  <span className="font-semibold bg-blue-500 text-white rounded-full px-2 py-1 mb-1">
                    {bonusCredit !== null ? bonusCredit.toFixed(0) : '0'}
                  </span>
                  <span className="block text-xs text-red-500">Expires on {bonusExpiry}</span>
                </div>
              </div>
            </>
          )}
          {currentSection === 'Developer' && (
            <div className="text-center pr-2 hidden sm:block">
              <div className="text-sm">
                <span className="block text-xs text-gray-500 font-semibold">Voice Balance</span>
                <span className="text-gray-500">00:01:00</span>
              </div>
            </div>
          )}
          <button>
            <img src="/help.svg" alt="Help" className="h-6 sm:h-9 w-auto mr-2" />
          </button>
          <div
            className="text-sm font-semibold flex items-center text-gray-500 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {username || 'User'}
            <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-44 bg-white border border-gray-300 rounded-lg shadow-lg w-48">
                <ul className="list-none p-0 m-0">
                  <li className="hover:bg-gray-100 cursor-pointer px-4 py-2 transition duration-200 ease-in-out" onClick={() => { router.push('/Profile'); }}>Profile</li>
                  <li className="hover:bg-gray-100 cursor-pointer px-4 py-2 transition duration-200 ease-in-out" onClick={() => { router.push('/Developer/ApiKeyCreation'); }}>Developer</li>
                  <li className="hover:bg-gray-100 cursor-pointer px-4 py-2 transition duration-200 ease-in-out">Referral</li>
                  <li className="hover:bg-gray-100 cursor-pointer px-4 py-2 transition duration-200 ease-in-out">Marketplace</li>
                  <li className="hover:bg-gray-100 cursor-pointer px-4 py-2 transition duration-200 ease-in-out" onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
