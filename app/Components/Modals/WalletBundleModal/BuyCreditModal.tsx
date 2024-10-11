import React from 'react';

// Define the props type
interface BuyCreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyFromAppWalletClick: () => void;
  onBuyFromMobileWalletClick: () => void;
}
const BuyCreditModal: React.FC<BuyCreditModalProps> = ({ isOpen, onClose, onBuyFromAppWalletClick, onBuyFromMobileWalletClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <h2 className="text-lg sm:text-xl font-medium mb-4 text-black">Buy Credit Bundle</h2>
        <p className="mb-4 text-black text-xs sm:text-sm">What action do you want to perform ?</p>
        <button
          className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-blue-100 hover:text-blue-400 text-sm sm:text-base"
          onClick={() => {
            onClose();
            onBuyFromAppWalletClick();
          }}
        >
        Buy From App Wallet
        </button>
        <button
          className="w-full bg-gray-100 text-gray-400 py-2 rounded mb-2 hover:bg-blue-100 hover:text-blue-400 text-sm sm:text-base"
          onClick={() => {
            onClose();
            onBuyFromMobileWalletClick();
          }}
        >
          Buy From Mobile Wallet
        </button>
       
        <button
          className="w-full sm:w-24 bg-gray-100 text-gray-800 py-2 mt-4 sm:mt-5 rounded text-sm sm:text-base"
          onClick={() => {
            onClose();
            
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default BuyCreditModal;
