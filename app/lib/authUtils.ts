import axios from 'axios';
import { saveToCookies, getFromCookies } from "./storage";

export const signUp = async (formData: {
  username: string;
  number: string;
  email: string;
  password: string;
}) => {
  const { username, number, email, password } = formData;

  try {
    const response = await axios.post('http://localhost:5000/auth/signup', {
      username,
      email,
      password,
      number,
    });

    // No need to parse response data as axios does this for us
    const data = response.data;

    // Save the response data to cookies
    await saveToCookies(); // Expires in 1 day

    // Save the response data to localStorage
    localStorage.setItem('signInResponse', JSON.stringify(data));

    // Console log all details saved in cookies and localStorage
    console.log('Sign-Up Response (Cookies):', getFromCookies('signInResponse'));
    console.log('Sign-Up Response (localStorage):', localStorage.getItem('signInResponse'));

    return data;
  } catch (err: any) {
    console.error('Sign-Up Error:', err);
    throw new Error(err.response?.data.msg || 'Registration failed');
  }
};

export const signIn = async (formData: {
  email: string;
  password: string;
}) => {
  const { email, password } = formData;

  try {
    const response = await axios.post('http://localhost:5000/auth/signin', {
      email,
      password,
    });

    // No need to parse response data as axios does this for us
    const data = response.data;

    // Save the response data to cookies
    await saveToCookies(); // Expires in 1 day

    // Save the response data to localStorage
    localStorage.setItem('signInResponse', JSON.stringify(data));

    // Console log all details saved in cookies and localStorage
    console.log('Sign-In Response (Cookies):', getFromCookies('signInResponse'));
    console.log('Sign-In Response (localStorage):', localStorage.getItem('signInResponse'));

    return data;
  } catch (err: any) {
    console.error('Sign-In Error:', err);
    console.log(err.response?.data.msg )
    throw new Error(err.response?.data.msg || 'Login failed');
  }
};



export const userdetails = async (userId: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/auth/${userId}`);
    
    return response.data; // Return the fetched API keys
  } catch (err: any) {
    console.error('Error fetching user details:', err.response?.data?.msg || 'An error occurred');
    throw err;
  }
};export const updateUserDetails = async (
  userId: number, 
  userData: { username: string; email: string; number: string }
) => {
  try {
    const response = await axios.put(`http://localhost:5000/auth/update/${userId}`, userData);

    // Clear localStorage
    localStorage.removeItem('signInResponse');

    // Save the updated user data to localStorage
    localStorage.setItem('signInResponse', JSON.stringify(response.data));

    console.log('Updated User Data:', response.data);

    return response.data; // Return the updated user data
  } catch (err: any) {
    console.error('Error updating user details:', err.response?.data?.msg || 'An error occurred');
    throw err; // Rethrow the error for further handling
  }
};
