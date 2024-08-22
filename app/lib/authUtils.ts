import { saveToCookies, getFromCookies } from "./storage";

export const signUp = async (formData: {
  username: string;
  number: string;
  email: string;
  password: string;
}) => {
  const { username, number, email, password } = formData;

  try {
    const response = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, number }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Registration failed');
    }

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
    throw new Error(err.message || 'An error occurred');
  }
};

export const signIn = async (formData: {
  email: string;
  password: string;
}) => {
  const { email, password } = formData;

  try {
    const response = await fetch('http://localhost:5000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Login failed');
    }

    // Save the response data to cookies
    saveToCookies(); // Expires in 1 day

    // Save the response data to localStorage
    localStorage.setItem('signInResponse', JSON.stringify(data));

    // Console log all details saved in cookies and localStorage
    console.log('Sign-In Response (Cookies):', getFromCookies('signInResponse'));
    console.log('Sign-In Response (localStorage):', localStorage.getItem('signInResponse'));

    return data;
  } catch (err: any) {
    console.error('Sign-In Error:', err);
    throw new Error(err.message || 'An error occurred');
  }
};
