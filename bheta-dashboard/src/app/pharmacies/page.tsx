'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useFetchNumberOfTImes } from '../hooks/useGetNumberTimes';
import { Pharmacy } from '../utils/types';


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PharmacyReportChart = () => {
  
  const pharmacies: Pharmacy[] = useFetchNumberOfTImes();

  const pharmacyReportMap = new Map();

  pharmacies.forEach(pharmacy => {
    if (pharmacyReportMap.has(pharmacy.name)) {
      const currentCount = pharmacyReportMap.get(pharmacy.name);
      pharmacyReportMap.set(pharmacy.name, currentCount + 1);
    } else {
      pharmacyReportMap.set(pharmacy.name, pharmacy.reported);
    }
  });

  const pharmacyNames = Array.from(pharmacyReportMap.keys());
  const reportedCounts = Array.from(pharmacyReportMap.values());

  const maxReportedCount = Math.max(...reportedCounts);

  const data = {
    labels: pharmacyNames, 
    datasets: [
      {
        label: 'Number of times reported',
        data: reportedCounts, 
        backgroundColor: ['#28a745', '#1f4068', '#1f9f88'], 
        borderColor: '#333', 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, 
        min: 1,             
        max: Math.max(maxReportedCount, 1),  
        title: {
          display: true,
          text: 'Number of times',
        },
        ticks: {
          stepSize: 1, 
          padding: 2,  
        },
      },
      x: {
        title: {
          display: true,
          text: 'Pharmacy name',
        },
      },
    },
  };

  return (

    <div className="container mx-auto p-4 darker grotesque">
      <h1 className="text-2xl font-bold text-center mb-6 mt-[20px]">Number of Times a Pharmacy Has Been Reported</h1>
      <Bar data={data} options={options} />
    </div>
   
  );
};

export default PharmacyReportChart;
