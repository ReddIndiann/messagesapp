import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus, faFileExport, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import AddContact from '../Modals/GroupsandContacts/AddContact';
import AddGroup from '../Modals/GroupsandContacts/AddGroup';
import EditContact from '../Modals/GroupsandContacts/EditContact';
import EditGroup from '../Modals/GroupsandContacts/EditGroup';
import ViewContact from '../Modals/GroupsandContacts/ViewContact';
import ViewGroup from '../Modals/GroupsandContacts/ViewGroup';
import { fetchContacts, deleteContact } from '@/app/lib/contactUtil';
import { fetchGroups, deleteGroup } from '@/app/lib/grouputil';
import ExcelUploadStepper from '../Modals/GroupsandContacts/ExportExcelSend';
import Swal from 'sweetalert2'; // Import SweetAlert2


const ContactsTables: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isExportExcelModalOpen, setIsExportExcelModalOpen] = useState<boolean>(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [isContactViewModalOpen, setIsContactViewModalOpen] = useState<boolean>(false);
  const [isGroupViewModalOpen, setIsGroupViewModalOpen] = useState<boolean>(false);
  const [isContactEditModalOpen, setIsContactEditModalOpen] = useState<boolean>(false);
  const [isGroupEditModalOpen, setIsGroupEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);

      if (extractedUserId) {
        fetchContacts(extractedUserId).then(setContacts).catch(console.error);
        fetchGroups(extractedUserId).then(setGroups).catch(console.error);
      }
      
    }if (userId) {
      fetchContacts(userId).then(setContacts).catch(console.error);
      fetchGroups(userId).then(setGroups).catch(console.error);
    }
  }, [userId]);
  const filteredContacts = contacts.filter(contact =>
    `${contact.firstname} ${contact.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleDeleteContact = async (contactId: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteContact(contactId);
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
        Swal.fire(
          'Deleted!',
          'Your contact has been deleted.',
          'success'
        );
      } catch (err: any) {
        console.error('Error deleting contact: ' + err.message);
        Swal.fire(
          'Error!',
          'There was an error deleting the contact.',
          'error'
        );
      }
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteGroup(groupId);
        setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
        Swal.fire(
          'Deleted!',
          'Your group has been deleted.',
          'success'
        );
      } catch (err: any) {
        console.error('Error deleting group: ' + err.message);
        Swal.fire(
          'Error!',
          'There was an error deleting the group.',
          'error'
        );
      }
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

  const handleEditContact = (contact: any) => {
    setSelectedContact(contact);
    setIsContactEditModalOpen(true);
  };

  const handleEditGroup = (group: any) => {
    setSelectedGroup(group);
    setIsGroupEditModalOpen(true);
  };

  const handleExportExcelClick = () => {
    setIsExportExcelModalOpen(true);
    console.log('pressed')
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
    <div className="w-full lg:w-3/5">
      {/* Contacts Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="font-medium text-base text-gray-700">Contacts ({filteredContacts.length})</h2>
        <div className="flex space-x-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center shadow-md"
            onClick={() => setIsContactModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            <span className="hidden sm:inline">Add Contact</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">Name</th>
              <th className="py-4 px-6 text-left font-semibold hidden sm:table-cell">Mobile</th>
              <th className="py-4 px-6 text-left font-semibold hidden md:table-cell">Groups</th>
              <th className="py-4 px-6 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition duration-200 text-gray-700"
              >
                <td className="py-4 px-6 font-medium">{contact.firstname} {contact.lastname}</td>
                <td className="py-4 px-6 hidden sm:table-cell">{contact.phone}</td>
                <td className="py-4 px-6 hidden md:table-cell">{getGroupCountForContact(contact.id)} Groups</td>
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
                      onClick={() => handleEditContact(contact)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      title="delete"
                      className="text-gray-400 hover:text-red-500 transition duration-200"
                      onClick={() => handleDeleteContact(contact.id)}
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
        {/* Groups Section */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="font-medium text-base text-gray-700">Groups ({groups.length})</h2>
          <div className="flex space-x-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center shadow-md"
              onClick={() => setIsGroupModalOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span className="hidden sm:inline">Add Group</span>
            </button>
         
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-4 px-6 text-left font-semibold">Group Name</th>
                <th className="py-4 px-6 text-left font-semibold hidden sm:table-cell">Member Count</th>
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
                  <td className="py-4 px-6 hidden sm:table-cell">{getContactCountForGroup(group.id)} members</td>
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
                        onClick={() => handleEditGroup(group)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        title="delete"
                        className="text-gray-400 hover:text-red-500 transition duration-200"
                        onClick={() => handleDeleteGroup(group.id)}
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

      {/* Modals */}
      <AddContact isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <AddGroup isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} />
      <EditContact isOpen={isContactEditModalOpen} onClose={() => setIsContactEditModalOpen(false)} contact={selectedContact} />
      <EditGroup isOpen={isGroupEditModalOpen} onClose={() => setIsGroupEditModalOpen(false)} group={selectedGroup} />
      <ViewContact isOpen={isContactViewModalOpen} onClose={() => setIsContactViewModalOpen(false)} contact={selectedContact} />
      <ViewGroup isOpen={isGroupViewModalOpen} onClose={() => setIsGroupViewModalOpen(false)} group={selectedGroup} />
      <ExcelUploadStepper
        isOpen={isExportExcelModalOpen}
        onClose={() => setIsExportExcelModalOpen(false)}
      />
    </div>
  );
};

export default ContactsTables;
