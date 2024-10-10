// src/lib/senderIdUtils.ts
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// Function to fetch sender IDs for a user
export const fetchSenderIds = async (userId: number) => {
  try {
    const response = await axios.get(`${apiUrl}/senders/user/${userId}`);
    return response.data; // Axios already parses JSON for you
  } catch (err: any) {
    console.error('Error fetching sender IDs:', err.response?.data?.msg || err.message || 'An error occurred');
    throw err;
  }
};

// Function to fetch all sender IDs and split them into approved and pending
export const fetchallSenderIds = async () => {
  try {
    const response = await axios.get(`${apiUrl}/senders/user/`);
    return response.data; // Axios automatically handles JSON
  } catch (err: any) {
    console.error('Error fetching all sender IDs:', err.response?.data?.msg || err.message || 'An error occurred');
    throw err;
  }
};

// Function to delete a sender ID

export const deleteSenderId = async (senderId: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/senders/${senderId}`);
    return response.data; // Return the success message or details
  } catch (err: any) {
    console.error('Error deleting sender ID:', err.response?.data?.msg || err.message || 'An error occurred');
    throw err;
  }
};

// Function to register a new Sender ID
export const registerSenderId = async (senderID: string, userId: number, purpose: string) => {
  try {
    const response = await axios.post(`${apiUrl}/senders/create`, {
      name: senderID,
      userId,
      purpose,
    });
    return response.data; // Return the response data
  } catch (err: any) {
    console.error('Error registering Sender ID:', err.response?.data?.msg || err.message || 'An error occurred');
    throw err;
  }
};
