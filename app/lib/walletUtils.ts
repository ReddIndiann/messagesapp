// groupService.ts
import axios from 'axios';

export interface Group {
  id: number;
  transactionid: string;
  amount: number;
  note:string;
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const depositewallet = async (walletData: { transactionid: string; userId: number | null; amount: number; note: string }) => {
    if (walletData.userId === null) {
      throw new Error('User ID is not available.');
    }
  
    try {
      // Sending the POST request to the correct endpoint with the updated data structure
      await axios.post(`${apiUrl}/wallet/create`, walletData);
      console.log('Wallet deposit created successfully');
    } catch (error) {
      console.error('Error creating wallet deposit:', error);
      throw error;
    }
  };

export const EditGroup = async (groupData: { groupName: string; userId: number | null }) => {
  if (groupData.userId === null) {
    throw new Error('User ID is not available.');
  }

  try {
    await axios.post('${apiUrl}/groups${contact.id}', groupData);
    console.log('Group registered successfully');
  } catch (error) {
    console.error('Error registering group:', error);
    throw error;
  }
};



export const fetchWalletHistory = async (userId: number): Promise<Group[]> => {
  try {
    const response = await axios.get<Group[]>(`${apiUrl}/wallet/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
};

export const fetchAllWalletHistory = async (): Promise<Group[]> => {
  try {
    const response = await axios.get<Group[]>(`${apiUrl}/wallet`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
};   



 export const deleteWallet = async (contactId: number) => {
  try {
    // Perform the delete operation using axios
    const response = await axios.delete(`${apiUrl}/wallet/${contactId}`);
    console.log('Group deleted successfully:', response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};