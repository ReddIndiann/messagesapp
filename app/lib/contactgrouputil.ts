import axios from 'axios';

const addContactToGroup = async (contactGroupData: { contactId: number; groupId: number; }) => {
  try {
    await axios.post('http://localhost:5000/contactgroups', contactGroupData);
    console.log('Contact added to group successfully');
  } catch (error) {
    console.error('Error adding contact to group:', error);
    throw error;
  }
};

export default addContactToGroup;
