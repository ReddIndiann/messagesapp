// Import axios for making HTTP requests
import axios from 'axios';

// Create the package function
export const createPackage = async (packageData: {
  name: string;
  type: string;
  price: number | null;   // Allow price to be null
  rate: number;
  smscount: number;
  expiry: boolean;
  duration: number | null; // Allow duration to be null
  bonusrate: number | null; // Allow bonusrate to be null
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Sending the POST request to the correct endpoint with bonusrate included
    await axios.post(`${apiUrl}/packages/create`, packageData);
    console.log('Package created successfully');
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
};
