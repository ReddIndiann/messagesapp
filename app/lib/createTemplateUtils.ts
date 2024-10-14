import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const createTemplate = async (
  title: string,
  content: string,
  messageCategory: string,
  userId: number | null
) => {
  if (!userId) {
    console.error('User ID not found.');
    return;
  }

  const templateData = {
    title,
    content,
    messageCategory,
    userId,
  };

  try {
    const response = await axios.post(`${apiUrl}/message-templates/create`, templateData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Template created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating template:', error);
    throw error;
  }
};

// src/lib/fetchTemplates.ts

export const fetchMessageTemplates = async (userId: number | null) => {
  if (!userId) {
    console.error('User ID not found.');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/message-templates/user/${userId}`);
    return response.data; // Assuming the API response is an array of message templates
  } catch (error) {
    console.error('Error fetching message templates:', error);
    return []; // Return an empty array in case of error
  }
};

export const fetchScheduleMessage = async (userId: number | null) => {
  if (!userId) {
    console.error('User ID not found.');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/schedule-messages/user/${userId}`);
    return response.data; // Assuming the API response is an array of scheduled messages
  } catch (error) {
    console.error('Error fetching scheduled messages:', error);
    return []; // Return an empty array in case of error
  }
};

export const deleteTemplate = async (contactId: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/message-templates/${contactId}`);
    console.log('Template deleted successfully:', response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error deleting Template:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
