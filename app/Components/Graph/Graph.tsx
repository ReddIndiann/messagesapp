import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  const data = [
    { date: '2024-08-01', valueA: 4, valueB: 1,  },
    { date: '2024-08-02', valueA: 3, valueB: 6, },
    { date: '2024-08-03', valueA: 5, valueB: 3},
    // { date: '2024-08-04', valueA: 4, valueB: 1, valueC: 2 },
    // { date: '2024-08-05', valueA: 3, valueB: 6, valueC: 5 },
    // { date: '2024-08-06', valueA: 5, valueB: 3, valueC: 6 },
    // { date: '2024-08-07', valueA: 4, valueB: 1, valueC: 2 },
    // { date: '2024-08-08', valueA: 3, valueB: 6, valueC: 5 },
    // { date: '2024-08-09', valueA: 5, valueB: 3, valueC: 6 },
  ];

  return (
    <BarChart
      xAxis={[
        {
          scaleType: 'band',
          data: data.map(item => item.date), // Extract dates for x-axis
        },
      ]}
      series={[
        { 
          label: 'Clients', 
          data: data.map(item => item.valueA),
          color: '#4caf50', // Custom color for Group A
        },
        { 
          label: 'Reciepts', 
          data: data.map(item => item.valueB),
          color: '#1e90ff', // Custom color for Group B
        },
        // { 
        //   label: 'Group C', 
        //   data: data.map(item => item.valueC),
        //   color: '#2196f3', // Custom color for Group C
        // },
      ]}
      width={700}  // Increase width
      height={400} // Increase height
    />
  );
}
// Light Blue: #add8e6
// Sky Blue: #87ceeb
// Dodger Blue: #1e90ff
// Royal Blue: #4169e1
// Medium Blue: #0000cd
// Dark Blue: #00008b