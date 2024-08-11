import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEnvelope, faUsers, faFileExcel } from '@fortawesome/free-solid-svg-icons';

interface ScheduleMessageOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleQuickSMSClick: () => void;
  onScheduleToGroupClick: () => void;
}

const ScheduleMessageOptions: React.FC<ScheduleMessageOptionsProps> = ({
  isOpen,
  onClose,
  onScheduleQuickSMSClick,
  onScheduleToGroupClick,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Message</h2>
            <p className="mb-6 text-gray-600">What action do you want to perform on your message?</p>
            <div className="space-y-4">
              <button
                className="w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 flex items-center"
                onClick={() => {
                  onClose();
                  onScheduleQuickSMSClick();
                }}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-blue-500" />
                <span>Quick SMS</span>
              </button>
              <button
                className="w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 flex items-center"
                onClick={() => {
                  onClose();
                  onScheduleToGroupClick();
                }}
              >
                <FontAwesomeIcon icon={faUsers} className="mr-3 text-blue-500" />
                <span>Send to Group</span>
              </button>
              <button
                className="w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 flex items-center"
              >
                <FontAwesomeIcon icon={faFileExcel} className="mr-3 text-blue-500" />
                <span>Send using Excel Sheet</span>
              </button>
            </div>
            <button
              className="w-full mt-6 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleMessageOptions;