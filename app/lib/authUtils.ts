import Cookies from 'js-cookie'; // Import the cookie library

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
      Cookies.set('signInResponse', JSON.stringify(data), { expires: 1 / 1440 }); // Expires in 1 day

      // Console log all details saved in cookies
      console.log('Sign-Up Response:', Cookies.get('signInResponse'));

      return data;
  } catch (err: any) {
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
      Cookies.set('signInResponse', JSON.stringify(data), { expires: 1 / 1440 });// Expires in 1 day

      // Console log all details saved in cookies
      console.log('Sign-In Response:', Cookies.get('signInResponse'));

      return data;
  } catch (err: any) {
      throw new Error(err.message || 'An error occurred');
  }
};
