import axios from 'axios';

// Function to create a new contact
const createContact = async (contactData: {
  firstname: string;
  lastname: string;
  birthday: string;
  phone: string;
  email: string;
  userId: number | null;
  groupId: number | null; 
}) => {
  if (contactData.userId === null) {
    throw new Error('User ID is not available.');
  }

  try {
    const response = await axios.post('http://localhost:5000/contacts', contactData);
    console.log('Contact registered successfully');
    return response; // Return the full response, including the new contact's ID
  } catch (error) {
    console.error('Error registering contact:', error);
    throw error;
  }
};

const addContactToGroup = async (contactId: number, groupId: number) => {
  try {
    await axios.post('http://localhost:5000/contactgroups', {
      contactId,
      groupId,
    });
    console.log('Contact added to group successfully');
  } catch (error) {
    console.error('Error adding contact to group:', error);
    throw error;
  }
};

// Function to fetch contacts for a specific user
const fetchContacts = async (userId: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/contacts/user/${userId}`);
    return response.data; // Return the fetched contacts
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export { createContact, fetchContacts ,addContactToGroup };
