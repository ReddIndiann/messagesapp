import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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
    const response = await axios.post(`${apiUrl}/contacts`, contactData);
    console.log('Contact registered successfully');
    return response; // Return the full response, including the new contact's ID
  } catch (error:any) {
    console.error('Error registering contact:', error);
    throw new Error(error.response?.data.msg || 'Failed Creating contact');
  }
};

const addContactToGroup = async (contactId: number, groupId: number) => {
  try {
    await axios.post(`${apiUrl}/contactgroups`, {
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
    const response = await axios.get(`${apiUrl}/contacts/user/${userId}`);
    return response.data; // Return the fetched contacts
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};


const fetchAllContacts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/contacts/`);
    return response.data; // Return the fetched contacts
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};
// Updated deleteContact function
const deleteContact = async (contactId: number) => {
  try {
    // Perform the delete operation using axios
    const response = await axios.delete(`${apiUrl}/contacts/${contactId}`);
    console.log('Contact deleted successfully:', response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Function to search contacts by name for a specific user
const searchContactsByName = async (userId: number, name: string) => {
  if (!name) {
    throw new Error('Name query parameter is required.');
  }

  try {
    const response = await axios.get(`${apiUrl}/contacts/user/${userId}/search`, {
      params: { name },
    });
    return response.data; // Return the searched contacts
  } catch (error) {
    console.error('Error searching contacts:', error);
    throw error;
  }
};

// Export the new function along with others
export { 
  createContact, 
  fetchContacts, 
  addContactToGroup, 
  fetchAllContacts, 
  deleteContact, 
  searchContactsByName 
};
