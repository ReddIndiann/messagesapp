import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const addContactToGroup = async (contactGroupData: { contactId: number; groupId: number; }) => {
  
  try {
    await axios.post('${apiUrl}/contactgroups', contactGroupData);
    console.log('Contact added to group successfully');
  } catch (error) {
    console.error('Error adding contact to group:', error);
    throw error;
  }
};

export default addContactToGroup;
