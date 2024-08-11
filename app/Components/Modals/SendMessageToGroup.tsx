// import React, { useState } from 'react';
// import ConfirmationMessageModal from './ConfirmationModal';

// // Define the props type
// interface SendMessageToGroupProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const SendMessageToGroup: React.FC<SendMessageToGroupProps> = ({ isOpen, onClose }) => {
//   const [selectedSenderID, setSelectedSenderID] = useState<string>('');
//   const [newSenderID, setNewSenderID] = useState<string>('');
//   const [campaignTitle, setCampaignTitle] = useState<string>('');
//   const [messageContent, setMessageContent] = useState<string>('');
//   const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

//   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsConfirmationModalOpen(true);
//   };

//   const handleAddSenderID = () => {
//     if (newSenderID) {
//       setSelectedSenderID(newSenderID);
//       setNewSenderID('');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3">
//         <h2 className="text-xl font-medium mb-6 text-black">Enter Message Details</h2>
//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-4 flex items-center gap-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700">Sender ID</label>
//               <div className="flex items-center gap-2">
//                 <select
//                   value={selectedSenderID}
//                   onChange={(e) => setSelectedSenderID(e.target.value)}
//                   className="block w-2/3 bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring focus:ring-opacity-50"
//                 >
//                   <option value="" disabled>Select Sender ID</option>
//                   <option value="12345">12345</option>
//                   <option value="67890">67890</option>
//                   {/* Add more options as needed */}
//                 </select>
//                 <button
//                   type="button"
//                   className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md text-sm"
//                   onClick={handleAddSenderID}
//                 >
//                   Add Sender ID
//                 </button>
//               </div>
//             </div>
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Campaign Title</label>
//             <input
//               type="text"
//               value={campaignTitle}
//               onChange={(e) => setCampaignTitle(e.target.value)}
//               className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring focus:ring-opacity-50"
//               placeholder="Enter Campaign Title"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700">Message Content</label>
//             <textarea
//               value={messageContent}
//               onChange={(e) => setMessageContent(e.target.value)}
//               className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 text-sm focus:ring focus:ring-opacity-50"
//               placeholder="Enter your message"
//               rows={6}
//             ></textarea>
//           </div>
//           <div className="flex justify-between gap-4">
//             <button
//               type="button"
//               className="bg-gray-200 text-gray-500 px-6 py-2 rounded-md text-sm"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className="bg-gray-300 text-gray-500 px-6 py-2 rounded-md text-sm"
//               onClick={() => alert('Schedule functionality not implemented yet')}
//             >
//               Schedule
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-400 text-white px-6 py-2 rounded-md text-sm"
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       </div>
//       {isConfirmationModalOpen && (
//         <ConfirmationMessageModal
//           isOpen={isConfirmationModalOpen}
//           onClose={() => setIsConfirmationModalOpen(false)}
//           senderID={selectedSenderID}
//           campaignTitle={campaignTitle}
//           messageContent={messageContent}
//         />
//       )}
//     </div>
//   );
// };

// export default SendMessageToGroup;
