"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { fetchUploads } from "../../utils/fetchUploads";

ChartJS.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

interface UploadData {
  total_uploads: number;
  daily_uploads: number[];
  weekly_uploads: number[];
  monthly_uploads: number[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    pointBorderColor: string;
    pointBorderWidth: number;
    pointRadius: number;
    fill: boolean;
  }[];
}

const ChartComponent = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Uploads",
        data: [],
        borderColor: "#000000",
        backgroundColor: "#000000",
        pointBorderColor: "#000000",
        pointBorderWidth: 3,
        pointRadius: 8,
        fill: false,
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState("daily");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUploads();
        const data = response as UploadData;

        if (data) {
          const processedData = processChartData(data, selectedRange);
          setChartData(processedData);
        } else {
          setChartData(getDefaultChartData());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData(getDefaultChartData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedRange]);

  const processChartData = (data: UploadData, range: string) => {
    let labels: string[] = [];
    let uploads: number[] = [];

    switch (range) {
      case "daily":
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        uploads = data.daily_uploads;
        break;
      case "weekly":
        labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
        uploads = data.weekly_uploads;
        break;
      case "monthly":
        labels = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        uploads = data.monthly_uploads;
        break;
      default:
        uploads = [0];
    }

    return {
      labels,
      datasets: [
        {
          label: "Uploads",
          data: uploads,
          borderColor: "#000000",
          backgroundColor: "#000000",
          pointBorderColor: "#000000",
          pointBorderWidth: 5,
          pointRadius: 15,
          fill: false,
        },
      ],
    };
  };

  const getDefaultChartData = () => {
    return {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Uploads",
          data: [0, 0, 0, 0, 0, 0, 0],
          borderColor: "#000000",
          backgroundColor: "#000000",
          pointBorderColor: "#000000",
          pointBorderWidth: 5,
          pointRadius: 10,
          fill: false,
        },
      ],
    };
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text: `Uploads Per ${
          selectedRange.charAt(0).toUpperCase() + selectedRange.slice(1)
        }`,
        font: { size: 24 },
        color: "black",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: `${
            selectedRange.charAt(0).toUpperCase() + selectedRange.slice(1)
          }`,
          font: { size: 20, family: "Inter, sans-serif" },
          color: "black",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Uploads",
          font: { size: 20, family: "Inter, sans-serif" },
          color: "black",
        },
        min: 0,
        max: 50,
        ticks: {
          stepSize: 5,
          callback(value) {
            if (typeof value === "number" && value % 5 === 0)
              return value.toString();
            return "";
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRange(e.target.value);
  };

  if (isLoading) return <div>Loading chart...</div>;

  return (
    <div className="w-[75vw] ml-16 nhm:w-11/12 nh:w-5/6 h-[700px] nh:h-3/5 bg-white p-4">
      <div className="mb-2">
        <label htmlFor="range" className="mr-2 text-sm">
          Select Time Range:
        </label>
        <select
          id="range"
          value={selectedRange}
          onChange={handleRangeChange}
          className="border px-1 py-0.5 rounded text-sm"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="w-full h-[600px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
