import axios from 'axios';

const createGroup = async (groupData: {
  groupName: string;
  userId: number | null;
}) => {
  if (groupData.userId === null) {
    throw new Error('User ID is not available.');
  }

  try {
    await axios.post('http://localhost:5000/groups', groupData);
    console.log('Group registered successfully');
  } catch (error) {
    console.error('Error registering group:', error);
    throw error;
  }
};

export default createGroup;
