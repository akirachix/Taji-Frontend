"use client"
import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const AnalyticsChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  const monthData = {
    January: [3, 5, 8, 10, 12],
    February: [2, 4, 6, 8, 10],
    March: [1, 3, 5, 7, 9],
    April: [5, 6, 8, 11, 14],
    May: [7, 9, 12, 13, 16],
    June: [10, 12, 14, 16, 18],
    July: [8, 7, 9, 12, 13],
    August: [6, 8, 10, 11, 14],
    September: [4, 5, 7, 9, 12],
    October: [3, 6, 9, 12, 15],
    November: [5, 7, 9, 13, 17],
    December: [6, 9, 11, 14, 18],
  };


  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: `Number of Uploads in ${selectedMonth}`,
        data: monthData[selectedMonth],
        borderColor: "black",
        backgroundColor: "black",
        pointRadius: 6,
      },
    ],
  };


  const pieData = {
    labels: ["Recalled", "Not Recalled"],
    datasets: [
      {
        label: "Recalled vs Not Recalled Medicines",
        data: [70, 30],
        backgroundColor: ["#22c55e", "#f3f4f6"],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="flex flex-col items-center p-4">
      <select
        className="mb-4 p-2 border border-gray-300 rounded-md"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>


      <div className="w-6 md:w-1/2 mb-8">
        <Line data={lineData} />
      </div>


      <div className="w-full md:w-1/2">
        <Pie data={pieData} />
      </div>
    </div>
  );
};


export default AnalyticsChart;
