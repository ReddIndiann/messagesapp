import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface ChartData {
  date: string; // Month-Year format
  valueA: number; // Total messages sent
  valueB: number; // Total recipients count
}

interface SignInResponse {
  user: {
    id: string; // User ID type (adjust if necessary)
  };
}
export default function BasicBars() {
  const [data, setData] = useState<ChartData[]>([]); // Use the defined type for data
  const [userId, setUserId] = useState<string | null>(null); // userId can be string or null

  useEffect(() => {
    const signInResponse = localStorage.getItem('signInResponse');
    if (signInResponse) {
      const parsedResponse = JSON.parse(signInResponse);
      const extractedUserId = parsedResponse.user?.id || null;
      setUserId(extractedUserId);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await fetch(`${apiUrl}/send-messages/getlist/${userId}`);
          const result = await response.json();
          
          // Assuming the response format contains an array of objects with monthYear, totalMessagesSent, and totalRecipientsCount
          const chartData = result.map(item => ({
            date: item.monthYear,
            valueA: item.totalMessagesSent,
            valueB: item.totalRecipientsCount,
          }));

          setData(chartData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [userId]); // Fetch data whenever userId changes

  return (
    <BarChart
      xAxis={[{
        scaleType: 'band',
        data: data.map(item => item.date), // Extract dates for x-axis
      }]}
      series={[
        { 
          label: 'Clients', 
          data: data.map(item => item.valueA),
          color: '#4caf50', // Custom color for Group A
        },
        { 
          label: 'Receipts', 
          data: data.map(item => item.valueB),
          color: '#1e90ff', // Custom color for Group B
        },
      ]}
      width={700}  // Increase width
      height={400} // Increase height
    />
  );
}
