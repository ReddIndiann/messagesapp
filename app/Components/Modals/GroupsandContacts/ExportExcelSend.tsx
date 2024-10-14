import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContact } from '@/app/lib/contactUtil';

interface ExcelUploadStepperProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExcelData {
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  date_of_birth?: string;
}

const ExcelUploadStepper: React.FC<ExcelUploadStepperProps> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ExcelData[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);

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
        setShowPreview(true);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please try again with a valid file.');
      }
    };
    reader.readAsBinaryString(file);
  }, [file]);

  const handleSaveContacts = useCallback(async () => {
    if (!userId) {
      setErrorMessage('User ID not found. Please log in again.');
      setShowErrorModal(true);
      return;
    }

    setProgress(0);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < data.length; i++) {
      const contact: any = {
        firstname: data[i].firstname || '',
        lastname: data[i].lastname || '',
        birthday: data[i].date_of_birth || '',
        phone: data[i].phone || '',
        email: data[i].email || '',
        userId: userId

      };

      try {
        await createContact(contact);
        successCount++;
      } catch (error) {
        console.error('Error saving contact:', error);
        failCount++;
      }

      setProgress(Math.round(((i + 1) / data.length) * 100));
    }

    if (successCount > 0) {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        onClose();
        router.push('/contacts'); // Assuming you have a contacts page
      }, 2000);
    }

    if (failCount > 0) {
      setErrorMessage(`Failed to save ${failCount} contact${failCount > 1 ? 's' : ''}.`);
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);
    }
  }, [data, userId, onClose, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {!showPreview ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-black bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Upload Excel File</h2>
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

          <div className="text-center mb-4">
            <p className="text-gray-600 mb-2">Please upload your Excel file to add contacts.</p>
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
                      <td className="p-2">John</td>
                      <td className="p-2">Doe</td>
                      <td className="p-2">1234567890</td>
                      <td className="p-2">john@example.com</td>
                      <td className="p-2">1990-01-01</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-black bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Excel Data Preview</h2>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"></path>
              </svg>
            </button>
          </div>

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

          <div className="flex justify-between gap-4">
            <button
              onClick={() => setFile(null)}
              className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors duration-200"
            >
              Reset
            </button>
            <button
              onClick={handleSaveContacts}
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              Save Contacts
            </button>
          </div>

          {progress > 0 && progress < 100 && (
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{width: `${progress}%`}}
                ></div>
              </div>
              <p className="text-center mt-2">{`${progress}% Complete`}</p>
            </div>
          )}
        </motion.div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-green-600 mb-2">Success!</h2>
            <p className="text-gray-700">Contacts have been successfully added.</p>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700">{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelUploadStepper;