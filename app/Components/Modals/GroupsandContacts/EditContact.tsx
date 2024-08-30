import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { createContact, addContactToGroup } from '@/app/lib/contactUtil';

interface EditContactProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any; // Contact data passed as a prop
}

interface Group {
  id: number;
  groupName: string;
}

const EditContact: React.FC<EditContactProps> = ({ isOpen, onClose, contact }) => {
  const [firstname, setFirstname] = useState<string>(contact?.firstname || '');
  const [lastname, setLastname] = useState<string>(contact?.lastname || '');
  const [birthday, setBirthday] = useState<string>(contact?.birthday || '');
  const [phone, setPhone] = useState<string>(contact?.phone || '');
  const [email, setEmail] = useState<string>(contact?.email || '');
  const [group, setGroup] = useState<number | null>(contact?.groupId || null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    if (contact) {
      setFirstname(contact.firstname || '');
      setLastname(contact.lastname || '');
      setBirthday(contact.birthday || '');
      setPhone(contact.phone || '');
      setEmail(contact.email || '');
      setGroup(contact.groupId || null);
    }
  }, [contact]);

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
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

  // useEffect(() => {
  //   if (contact) {
  //     setFirstname(contact.firstname);
  //     setLastname(contact.lastname);
  //     setEmail(contact.email);
  //     setPhone(contact.phone);
  //     setBirthday(contact.birthday);
  //   }
  // }, [contact]);

  if (!isOpen) return null;

  const handleSaveChanges = async () => {
    if (!contact) {
      console.error('No contact to edit.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/contacts/${contact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone,
          birthday,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact.');
      }

      setShowSuccessModal(true);

      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
          <h2 className="text-xl font-medium mb-4 text-black">Edit Contact</h2>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="firstname">First Name</label>
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
            <label className="block text-black mb-2" htmlFor="lastname">Last Name</label>
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
            <label className="block text-black mb-2" htmlFor="birthday">Birthday</label>
            <input
              id="birthday"
              type="date"
              className="w-full p-2 border border-gray-300 rounded text-slate-700"
              value={birthday}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="phone">Phone</label>
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
            <label className="block text-black mb-2" htmlFor="email">Email</label>
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
            <label className="block text-black mb-2" htmlFor="group">Group</label>
            <select
              id="group"
              className="w-full p-2 border border-gray-300 rounded text-slate-700"
              value={group || ''}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setGroup(Number(e.target.value))}
            >
              <option value="" disabled>Select a group</option>
              {groups.map(groupItem => (
                <option key={groupItem.id} value={groupItem.id}>{groupItem.groupName}</option>
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
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10">
            <h2 className="text-xl font-medium text-green-600">Success!</h2>
            <p className="text-gray-700">Contact updated successfully.</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
                onClick={handleCloseSuccessModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditContact;







