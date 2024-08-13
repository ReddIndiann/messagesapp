export const signUp = async (formData: {
  username: string;
  phone: string;
  email: string;
  password: string;
}) => {
  const { username, phone, email, password } = formData;

  try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, number: phone }),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.msg || 'Registration failed');
      }

      // Save the response data to localStorage
      localStorage.setItem('signUpResponse', JSON.stringify(data));

      // Console log all details saved in localStorage
      console.log('Sign-Up Response:', localStorage.getItem('signUpResponse'));

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
      const response = await fetch('http://localhost:5000/api/auth/signin', {
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

      // Save the response data to localStorage
      localStorage.setItem('signInResponse', JSON.stringify(data));

      // Console log all details saved in localStorage
      console.log('Sign-In Response:', localStorage.getItem('signInResponse'));

      return data;
  } catch (err: any) {
      throw new Error(err.message || 'An error occurred');
  }
};
