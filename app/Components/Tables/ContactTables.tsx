import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus, faFileExport, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import AddContact from '../Modals/AddContact';
import AddGroup from '../Modals/AddGroup';
import ViewContact from '../Modals/ViewContact'; // Import ViewContact Modal
import ViewGroup from '../Modals/ViewGroup'; // Import ViewGroup Modal

const ContactsTables: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [isContactViewModalOpen, setIsContactViewModalOpen] = useState<boolean>(false);
  const [isGroupViewModalOpen, setIsGroupViewModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
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

  const getGroupCountForContact = (contactId: number) => {
    return groups.filter(group => group.contacts.some((contact: any) => contact.id === contactId)).length;
  };

  const getContactCountForGroup = (groupId: number) => {
    return contacts.filter(contact => contact.groups.some((group: any) => group.id === groupId)).length;
  };

  const handleViewContact = (contact: any) => {
    setSelectedContact(contact);
    setIsContactViewModalOpen(true);
  };

  const handleViewGroup = (group: any) => {
    setSelectedGroup(group);
    setIsGroupViewModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 p-6 bg-gray-100">
      <div className="w-full lg:w-3/5">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="font-medium text-base text-gray-700">Contacts ({contacts.length})</h2>
          <div className="flex space-x-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center shadow-md"
              onClick={() => setIsContactModalOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Add Contact</span>
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 flex items-center shadow-md">
              <FontAwesomeIcon icon={faFileExport} className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-4 px-6 text-left font-semibold">Name</th>
                <th className="py-4 px-6 text-left font-semibold">Mobile</th>
                <th className="py-4 px-6 text-left font-semibold">Groups</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200 text-gray-700"
                >
                  <td className="py-4 px-6 font-medium">{contact.firstname}</td>
                  <td className="py-4 px-6">{contact.phone}</td>
                  <td className="py-4 px-6">{getGroupCountForContact(contact.id)} Groups</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center space-x-3 items-center">
                      <button
                        title="view"
                        className="text-gray-400 hover:text-gray-600 transition duration-200"
                        onClick={() => handleViewContact(contact)}
                      >
                        <FontAwesomeIcon icon={faUser} />
                      </button>
                      <button
                        title="edit"
                        className="text-gray-400 hover:text-gray-600 transition duration-200"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        title="delete"
                        className="text-gray-400 hover:text-red-500 transition duration-200"
                      >
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

      <div className="w-full lg:w-2/5">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="font-medium text-base text-gray-700">Groups ({groups.length})</h2>
          <div className="flex space-x-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center shadow-md"
              onClick={() => setIsGroupModalOpen(true)}
            >
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
          <table className="w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-4 px-6 text-left font-semibold">Group Name</th>
                <th className="py-4 px-6 text-left font-semibold">Member Count</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200 text-gray-700"
                >
                  <td className="py-4 px-6 font-medium">{group.groupName}</td>
                  <td className="py-4 px-6">{getContactCountForGroup(group.id)} members</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center space-x-3 items-center">
                      <button
                        title="view"
                        className="text-gray-400 hover:text-gray-600 transition duration-200"
                        onClick={() => handleViewGroup(group)}
                      >
                        <FontAwesomeIcon icon={faUsers} />
                      </button>
                      <button
                        title="edit"
                        className="text-gray-400 hover:text-gray-600 transition duration-200"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        title="delete"
                        className="text-gray-400 hover:text-red-500 transition duration-200"
                      >
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
      
      <ViewContact 
        isOpen={isContactViewModalOpen} 
        onClose={() => setIsContactViewModalOpen(false)} 
        contact={selectedContact} 
      />
      
      <ViewGroup 
        isOpen={isGroupViewModalOpen} 
        onClose={() => setIsGroupViewModalOpen(false)} 
        group={selectedGroup} 
      />
    </div>
  );
};

export default ContactsTables;
