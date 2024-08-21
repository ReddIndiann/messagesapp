import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { createContact ,addContactToGroup} from '@/app/lib/contactUtil';
import Cookies from 'js-cookie';
// Define the props type interface
interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Group {
  id: number;
  groupName: string; // Changed from 'me' to 'groupName' to match usage
}

const AddContact: React.FC<AddContactModalProps> = ({ isOpen, onClose }) => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [group, setGroup] = useState<number | null>(null); // Store group ID
  const [groups, setGroups] = useState<Group[]>([]); // State for groups list
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const signInResponse = Cookies.get('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);

      if (extractedUserId) {
        fetchGroups(extractedUserId);
      }
    }
  }, []);

  const fetchGroups = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/groups/user/${userId}`);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  if (!isOpen) return null;

  const handleRegister = async () => {
    try {
      // Create the contact
      const response = await createContact({
        firstname,
        lastname,
        birthday,
        phone,
        email,
        userId,
        groupId: group, // Pass the selected group ID
      });
  
      const newContactId = response.data.id; // Extract the new contact's ID from the response
  
      if (group && newContactId) {
        // Add the new contact to the selected group
        await addContactToGroup(newContactId, group);
      }
  
      onClose();
    } catch (error) {
      console.error('Error registering contact:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
        <h2 className="text-xl font-medium mb-4 text-black">Register a new Contact</h2>
        
        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="firstname">
            First Name
          </label>
          <input
            id="firstname"
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-slate-700"
            value={firstname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="lastname">
            Last Name
          </label>
          <input
            id="lastname"
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-slate-700"
            value={lastname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="birthday">
            Birthday
          </label>
          <input
            id="birthday"
            type="date"
            className="w-full p-2 border border-gray-300 rounded text-slate-700"
            value={birthday}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full p-2 border border-gray-300 rounded text-slate-700"
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded text-slate-700"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="group">
            Add to Group
          </label>
          <select
            id="group"
            className="w-full p-2 border border-gray-300 rounded text-slate-700"
            value={group || ''} // Handle null value
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setGroup(Number(e.target.value))}
          >
            <option value="" disabled>Select a group</option>
            {groups.map((groupItem) => (
              <option key={groupItem.id} value={groupItem.id}>
                {groupItem.groupName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-black py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
            onClick={handleRegister}
          >
            Register Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
