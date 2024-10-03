// const Step2: React.FC<{
//   onNext: (data: Partial<FormData>) => void;
//   onPrevious: () => void;
//   formData: FormData;
//   onClose: () => void;
//   senders: Sender[];
// }> = ({ onNext, onPrevious, formData, onClose, senders }) => {
//   const [localFormData, setLocalFormData] = useState(formData);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setLocalFormData({ ...localFormData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onNext(localFormData);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//       className="relative"
//     >
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">Compose Message</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="selectedSenderID" className="block text-sm font-medium text-gray-700 mb-1">
//             Sender ID
//           </label>
//           <select
//             id="selectedSenderID"
//             value={localFormData.selectedSenderID}
//             onChange={handleChange}
//             className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
//             required
//           >
//             <option value="" disabled>
//               Select Sender ID
//             </option>
//             {senders && senders.length > 0 ? (
//               senders.map((sender) => (
//                 <option key={sender.id} value={sender.id}>
//                   {sender.name} ({sender.id})
//                 </option>
//               ))
//             ) : (
//               <option value="" disabled>
//                 No Sender IDs available
//               </option>
//             )}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="campaignTitle" className="block text-sm font-medium text-gray-700 mb-1">
//             Campaign Title
//           </label>
//           <input
//             id="campaignTitle"
//             type="text"
//             value={localFormData.campaignTitle}
//             onChange={handleChange}
//             className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
//             placeholder="Enter Campaign Title"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-1">
//             Message Content
//           </label>
//           <textarea
//             id="messageContent"
//             value={localFormData.messageContent}
//             onChange={handleChange}
//             className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200"
//             placeholder="Enter your message"
//             rows={4}
//             required
//           ></textarea>
//           <p className="mt-1 text-xs text-gray-500">Characters: {localFormData.messageContent.length} / 160</p>
//         </div>
//         <div className="flex justify-between gap-3">
//           <button
//             type="button"
//             onClick={onPrevious}
//             className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
//           >
//             Back
//           </button>
//           <button
//             type="submit"
//             className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
//           >
//             Next: Confirm
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// };