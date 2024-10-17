// lib/fetchTableData.ts
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export type FetchTableDataProps = {
    section: 'campaignHistory' | 'deliveryReport';
    userId: number;
  };
  
  export const fetchTableData = async ({ section, userId }: FetchTableDataProps) => {
    try {
      const response = await fetch(`${apiUrl}send-messages/user/${userId}`);
      const result = await response.json();
  
      if (section === 'campaignHistory') {
        // Format the data for campaign history
        return result.map((item: any) => ({
          name: item.content,
          totalRecipients: 1, // Placeholder
          senderId: item.senderId,
          dateTime: new Date(item.createdAt).toLocaleString(),
          totalCreditUsed: 0, // Placeholder
          walletBalanceUsed: 0, // Placeholder
        }));
      } else if (section === 'deliveryReport') {
        // Format the data for delivery report
        return result.map((item: any) => ({
          id: item.id,
          recipients: item.recipients,
          senderId: item.senderId,
          content: item.content,
          messageType: item.messageType,
          createdAt: new Date(item.createdAt).toLocaleString(),
        }));
      }
  
      return [];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  

  export const fetchList = async (userId: number) => {
    try {
      const response = await axios.get(`${apiUrl}/send-messages/user/${userId}`);
      return response.data; // Return the fetched contacts
    } catch (error) {
      console.error('Error fetching credit useddd:', error);
      throw error;
    }
  };
  export const fetchSendList = async (userId: number) => {
    try {
      const response = await axios.get(`${apiUrl}/send-messages/user/${userId}`);
      return response.data; // Return the fetched contacts
    } catch (error) {
      console.error('Error fetching credit useddd:', error);
      throw error;
    }
  };

  export const fetchScheduleList = async (userId: number) => {
    try {
      const response = await axios.get(`${apiUrl}/schedule-messages/user/${userId}`);
      return response.data; // Return the fetched contacts
    } catch (error) {
      console.error('Error fetching credit useddd:', error);
      throw error;
    }
  };
  export const fetchGraph = async (userId: number) => {
    try {
      const response = await axios.get(`${apiUrl}/send-messages/getlist/${userId}`);
      return response.data.totalMessagesSent; // Ensure this returns the required data structure
    } catch (error) {
      console.error('Error fetching campaign data:', error);
      throw error;
    }
  };
  