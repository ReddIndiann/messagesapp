import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus, faFileExport } from '@fortawesome/free-solid-svg-icons';
import AddContact from '../Modals/AddContact';
import AddGroup from '../Modals/AddGroup';

const ContactsTables: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const signInResponse = Cookies.get('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);

      if (extractedUserId) {
        fetchContacts(extractedUserId);
        fetchGroups(extractedUserId);
      }
    }
  }, []);

  const fetchContacts = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/contacts/user/${userId}`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchGroups = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/groups/user/${userId}`);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // Function to get the number of groups a contact belongs to
  const getGroupCountForContact = (contactId: number) => {
    return groups.filter(group => group.contacts.some((contact: any) => contact.id === contactId)).length;
  };
  const  getContactCountForGroup= (groupId: number) => {
    return contacts.filter(contact => contact.groups.some((group: any) => group.id === groupId)).length;
  };
  return (
    <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 p-6 bg-gray-100">
      {/* Contacts Table */}
      <div className="w-full lg:w-1/2">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="font-bold text-2xl text-gray-800">Contacts ({contacts.length})</h2>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center shadow-md" onClick={() => setIsContactModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Add Contact</span>
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center shadow-md">
              <FontAwesomeIcon icon={faFileExport} className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">Name</th>
                <th className="py-3 px-6 text-left font-semibold">Mobile</th>
                <th className="py-3 px-6 text-left font-semibold">Groups</th>
                <th className="py-3 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                  
                  <td className="py-4 px-6 text-gray-800 font-medium">{contact.firstname}</td>
                  <td className="py-4 px-6 text-gray-600">{contact.phone}</td>
                  <td className="py-4 px-6 text-gray-600">{getGroupCountForContact(contact.id)} Groups</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center space-x-3 items-center">
                      <button 
                      title='view'
                      className="text-gray-400 hover:text-gray-600 transition duration-200">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      
                      <button 
                       title='edit'
                       className="text-gray-400 hover:text-gray-600 transition duration-200">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        title='delete'
                        className="text-gray-400 hover:text-gray-600 transition duration-200">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Groups Table */}
      <div className="w-full lg:w-1/2">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="font-bold text-2xl text-gray-800">Groups ({groups.length})</h2>
          <div className="flex space-x-3">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center shadow-md" onClick={() => setIsGroupModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Add Group</span>
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center shadow-md">
              <FontAwesomeIcon icon={faFileExport} className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">Group Name</th>
                <th className="py-3 px-6 text-left font-semibold">Member Count</th>
                <th className="py-3 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="py-4 px-6 text-gray-800 font-medium">{group.groupName}</td>
                  <td className="py-4 px-6 text-gray-600">{getContactCountForGroup(group.id)} members</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center space-x-3 items-center">
                      <button title='view' className="text-gray-400 hover:text-gray-600 transition duration-200">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button title='edit' className="text-gray-400 hover:text-gray-600 transition duration-200">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button title='delete' className="text-gray-400 hover:text-gray-600 transition duration-200">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddContact isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <AddGroup isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} />
    </div>
  );
};

export default ContactsTables;
