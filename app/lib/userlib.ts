import axios from 'axios';

// Function to create a new contact


const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/auth/`);
    return response.data; // Return the fetched contacts
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export {  fetchAllUsers};
