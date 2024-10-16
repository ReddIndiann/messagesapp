// Import axios for making HTTP requests
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// Create the package function
export const createPackage = async (packageData: {
  name: string;
  type: string;
  userEntry:boolean;
  price: number | null;   // Allow price to be null
  rate: number;
  smscount: number;
  expiry: boolean;
  duration: number | null; // Allow duration to be null
  bonusrate: number | null; // Allow bonusrate to be null
}) => {


  try {
    // Sending the POST request to the correct endpoint with bonusrate included
    await axios.post(`${apiUrl}/packages/create`, packageData);
    console.log('Package created successfully');
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
};


export const createUsageOrder = async (usageData: {
  name: string;
  comment: string;
 
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {

    await axios.post(`${apiUrl}/creditusageorder/create`, usageData);
    console.log('Package created successfully');
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
};

export const fetchAllPackages = async () => {
  try {
    const response = await axios.get(`${apiUrl}/packages/`);
    return response.data; // Return the fetched users
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

export const fetchAllCreditUsage = async () => {
  try {
    const response = await axios.get(`${apiUrl}/creditusageorder/`);
    return response.data.creditusage; // Return the fetched users
  } catch (error) {
    console.error('Error fetching order list:', error);
    throw error;
  }
};


export const fetchall = async()=>{

  try{
const response = await axios.get('')
return response.data;

  } 
  catch(error){
    console.error("");
    throw error;
  }
}