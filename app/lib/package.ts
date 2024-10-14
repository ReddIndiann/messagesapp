import axios from 'axios';

export const createPackage = async (packageData: {
  name: string;
  type: string;
  price: number;
  rate: number;
  smscount: number;
  expiry: string;
  duration: number;
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Sending the POST request to the correct endpoint
    await axios.post(`${apiUrl}/packages/create`, packageData);
    console.log('Package created successfully');
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
};

export const createCreditUsage= async (creditusageData: {
  usefirst: string;
  usesecond: string;
  usethird: string;

}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Sending the POST request to the correct endpoint
    await axios.post(`${apiUrl}/creditusage/create`, creditusageData);
    console.log('Credit Usage created successfully');
  } catch (error) {
    console.error('Error creating Credit Usage :', error);
    throw error;
  }
};



// export const fetchWalletHistory = async (userId: number): Promise<Group[]> => {
//   try {
//     const response = await axios.get<Group[]>(`${apiUrl}/wallet/user/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching wallet:', error);
//     throw error;
//   }
// };

// export const fetchAllWalletHistory = async (): Promise<Group[]> => {
//   try {
//     const response = await axios.get<Group[]>(`${apiUrl}/wallet`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching wallet:', error);
//     throw error;
//   }
// };   



//  export const deleteWallet = async (contactId: number) => {
//   try {
//     // Perform the delete operation using axios
//     const response = await axios.delete(`${apiUrl}/wallet/${contactId}`);
//     console.log('Group deleted successfully:', response.data);
//     return response.data; // Return the response data if needed
//   } catch (error) {
//     console.error('Error deleting group:', error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };