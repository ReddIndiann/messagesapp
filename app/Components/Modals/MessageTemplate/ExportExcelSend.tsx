import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ExcelUploadStepperProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialContent: string;
}

interface ExcelData {
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  date_of_birth?: string;
}

const ExcelUploadStepper: React.FC<ExcelUploadStepperProps> = ({ isOpen, onClose,initialTitle, initialContent }) => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ExcelData[]>([]);
  const [step, setStep] = useState<number>(1);
  const [campaignTitle, setCampaignTitle] = useState<string>(initialTitle);
  const [messageContent, setMessageContent] = useState<string>(initialContent);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  }, []);

  const handleUpload = useCallback(() => {
    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);

        const phoneNumbers:any = jsonData.map(row => row.phone).filter(phone => phone);
        setRecipients(phoneNumbers );

        setStep(2);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please try again with a valid file.');
      }
    };
    reader.readAsBinaryString(file);
  }, [file]);

  const handleBack = useCallback(() => {
    setStep(1);
    setFile(null);
    setData([]);
    setRecipients([]);
  }, []);

  const handleSendMessage = useCallback(async () => {
    const payload = {
      senderId: 1, // You might want to get this from the user's session or input
      userId: 1, // You might want to get this from the user's session
      campaignTitle,
      content: messageContent,
      messageType: 'text',
      recursion: 'none',
      recipients,
    };

    try {
      const response = await axios.post('http://localhost:5000/send-messages/create', payload);
      console.log('Message sent successfully:', response.data);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        onClose();
      }, 2000);
      router.push('/Sms/CampaignHistory');
    } catch (error) {
      console.error('Error scheduling message:', error);
      let errorMessage = 'An unexpected error occurred.';

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || 'An error occurred while sending the message.';
      }

      setShowErrorModal(true);
      setErrorMessage(errorMessage);

      setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);
    }
  }, [campaignTitle, messageContent, recipients, onClose, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-black bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {step === 1 ? 'Upload Excel File' : step === 2 ? 'Excel Data Preview' : 'Confirm Message'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {step === 1 && (
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-2">Please upload your Excel file to proceed.</p>
            <div className="border border-gray-300 rounded-lg p-4 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-100">
                    <th className="p-2 text-left">Firstname</th>
                    <th className="p-2 text-left">Lastname</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Date of Birth</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(4)].map((_, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2">George</td>
                      <td className="p-2">Darko</td>
                      <td className="p-2">0202346754</td>
                      <td className="p-2">darko@mail.com</td>
                      <td className="p-2">19/09/98</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mb-4">
              <p className="text-red-500 font-semibold mb-2">PLEASE NOTE:</p>
              <p className="text-sm text-gray-600 mb-2">
                You are now required to add titles or headers to each column for easy identification. Phone
                numbers can be in any column instead of the first column. Kindly do well to select column after upload.
              </p>
              <p className="text-sm text-gray-600">
                Maximum File Size: <span className="text-red-500 font-semibold">5MB</span>
              </p>
            </div>

            <div className="flex justify-between items-center">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="hidden"
                id="excel-file-input"
              />
              <label
                htmlFor="excel-file-input"
                className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300 transition-colors"
              >
                {file ? file.name : 'Choose File'}
              </label>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                disabled={!file}
              >
                Upload Excel Sheet
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="border border-gray-300 rounded-lg p-4 mb-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-100">
                    <th className="p-2 text-left">Firstname</th>
                    <th className="p-2 text-left">Lastname</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Date of Birth</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 5).map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2">{row.firstname || ''}</td>
                      <td className="p-2">{row.lastname || ''}</td>
                      <td className="p-2">{row.phone || ''}</td>
                      <td className="p-2">{row.email || ''}</td>
                      <td className="p-2">{row.date_of_birth || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.length > 5 && (
              <p className="mt-2 text-gray-600 text-sm">Showing first 5 rows of {data.length} total rows.</p>
            )}
            <div className="mb-4">
              <label htmlFor="campaignTitle" className="block text-sm font-medium text-gray-700 mb-2">Campaign Title</label>
              <input
                id="campaignTitle"
                type="text"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter Campaign Title"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
              <textarea
                id="messageContent"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
                placeholder="Enter your message"
                rows={6}
                required
              ></textarea>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleBack}
                className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-full bg-blue-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Confirm Your Message</h2>
            <div className="mb-4">
              <p className="text-lg font-medium">Campaign Title:</p>
              <p className="text-gray-700">{campaignTitle}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">Message Content:</p>
              <p className="text-gray-700">{messageContent}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">Recipients:</p>
              <p className="text-gray-700">{recipients.length} contacts</p>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setStep(2)}
                className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={handleSendMessage}
                className="w-full bg-blue-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
            {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-medium text-green-600">Success!</h2>
            <p className="text-gray-700">Sender ID registered successfully.</p>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-medium text-red-600">Error!</h2>
            <p className="text-gray-700">{errorMessage}</p>
          </div>
        </div>
      )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ExcelUploadStepper;
