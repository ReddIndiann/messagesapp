import axios from 'axios';

// Function to fetch all users
const fetchAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/auth/');
    return response.data; // Return the fetched users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to fetch a user by ID
const fetchUserById = async (userId: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/auth/${userId}`);
    return response.data; // Return the fetched user
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// Function to update a user by ID
const updateUserById = async (userId: number, updatedUserData: any) => {
  try {
    const response = await axios.put(`http://localhost:5000/auth/update/${userId}`, updatedUserData);
    return response.data; // Return the updated user data
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

export { fetchAllUsers, fetchUserById, updateUserById };
