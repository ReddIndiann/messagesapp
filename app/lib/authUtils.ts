import axios from 'axios';
import { saveToCookies, getFromCookies, deleteAuthCookie } from "./storage";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Sign Up Function
export const signUp = async (formData: {
  username: string;
  number: string;
  email: string;
  password: string;
}) => {
  const { username, number, email, password } = formData;

  try {
    const response = await axios.post(`${apiUrl}/auth/signup`, {
      username,
      email,
      password,
      number,
    });

    const data = response.data;

    // Save the token to cookies
    await saveToCookies(data.token);

    // Save the response data to localStorage
    localStorage.setItem('signInResponse', JSON.stringify(data));

    // Log cookies and localStorage data for debugging
    console.log('Sign-Up Response (Cookies):', getFromCookies('signInResponse'));
    console.log('Sign-Up Response (localStorage):', localStorage.getItem('signInResponse'));

    return data;
  } catch (err: any) {
    console.error('Sign-Up Error:', err);
    throw new Error(err.response?.data.msg || 'Registration failed');
  }
};

// Sign In Function
export const signIn = async (formData: {
  email: string;
  password: string;
}) => {
  const { email, password } = formData;

  try {
    const response = await axios.post(`${apiUrl}/auth/signin`, {
      email,
      password,
    });

    const data = response.data;

    // Save the token to cookies
    await saveToCookies(data.token);

    // Save the response data to localStorage
    localStorage.setItem('signInResponse', JSON.stringify(data));

    // Log cookies and localStorage data for debugging
    console.log('Sign-In Response (Cookies):', getFromCookies('signInResponse'));
    console.log('Sign-In Response (localStorage):', localStorage.getItem('signInResponse'));

    return data;
  } catch (err: any) {
    console.error('Login Error:', err);
    throw new Error(err.response?.data.msg || 'Login failed');
  }
};

// Fetch User Details
export const userdetails = async (userId: number) => {
  try {
    const response = await axios.get(`${apiUrl}/auth/${userId}`);
    return response.data;
  } catch (err: any) {
    console.error('Error fetching user details:', err.response?.data?.msg || 'An error occurred');
    throw err;
  }
};

// Update User Details
export const updateUserDetails = async (
  userId: number,
  userData: { username: string; email: string; number: string }
) => {
  try {
    const response = await axios.put(`${apiUrl}/auth/update/${userId}`, userData);

    // Clear localStorage
    localStorage.removeItem('signInResponse');

    // Save the updated user data to localStorage
    localStorage.setItem('signInResponse', JSON.stringify(response.data));

    console.log('Updated User Data:', response.data);

    return response.data;
  } catch (err: any) {
    console.error('Error updating user details:', err.response?.data?.msg || 'An error occurred');
    throw err;
  }
};

// Change Password Function
export const changePassword = async (
  userId: number,
  formData: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  const { oldPassword, newPassword } = formData;

  try {
    const response = await axios.put(`${apiUrl}/auth/change-password/${userId}`, {
      oldPassword,
      newPassword,
    });

    console.log('Password changed successfully:', response.data);
    return response.data;
  } catch (err: any) {
    const errorMsg = err.response?.data.msg || 'Password change failed';
    console.error('Change Password Error:', errorMsg);
    throw new Error(errorMsg);
  }
};

// Log out user and clear cookies/localStorage
export const logoutUser = async () => {
  try {
    await deleteAuthCookie();
    localStorage.removeItem('signInResponse');
    console.log('User logged out and cookies cleared.');
  } catch (err: any) {
    console.error('Logout Error:', err);
  }
};
