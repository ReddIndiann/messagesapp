import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// Function to fetch sender IDs for a user
export const fetchApiKeys = async (userId: number) => {
  try {
    const response = await axios.get(`const apiUrl = process.env.NEXT_PUBLIC_API_URL;/apikeys/user/${userId}`);
    
    return response.data; // Return the fetched API keys
  } catch (err: any) {
    console.error('Error fetching API keys:', err.response?.data?.msg || 'An error occurred');
    throw err;
  }
};

// Function to fetch all API keys
export const fetchallApiKeys = async () => {
  try {
    const response = await axios.get('${apiUrl}/senders/user/');
    
    return response.data; // Return the fetched API keys
  } catch (err: any) {
    console.error('Error fetching API keys:', err.response?.data?.msg || 'An error occurred');
    throw err;
  }
};

// Function to delete an API key
export const deleteApiKeys = async (senderId: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/senders/${senderId}`);
    
    return response.data; // Return a success message or the deleted item details
  } catch (err: any) {
    console.error('Error deleting API key:', err.response?.data?.msg || 'An error occurred');
    throw err;
  }
};

// Function to register a new API key
export const registerApiKeys = async (senderID: string, userId: number) => {
  try {
    const response = await axios.post('${apiUrl}/apikeys/create', {
      name: senderID,
      userId,
    });

    return response.data; // Return the response data
  } catch (err: any) {
    console.error('Error registering API key:', err.response?.data?.msg || 'An error occurred');
    throw err;
  }
};
