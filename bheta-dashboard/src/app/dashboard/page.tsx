'use client';
import React, { useState, useEffect } from 'react';
// import { fetchReportedPharmacies } from '../utils/fetchReportedPharmacies';
import { fetchReportedPharmacies } from '../(dashboard)/dashboard/utils/fetchReportedPharmacies';
// import { fetchUploads } from '../utils/fetchUploads';
import { fetchUploads } from '../(dashboard)/dashboard/utils/fetchUploads';
// import ChartComponent from '../components/Charts/LineChart';
import ChartComponent from '../(dashboard)/dashboard/components/Charts/LineChart';
// import DashboardLayout from '../components/Layout';
import DashboardLayout from '../(dashboard)/dashboard/components/Layout';

const Dashboard = () => {
  const [reportedPharmacies, setReportedPharmacies] = useState(0);
  const [uploads, setUploads] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pharmaciesData = await fetchReportedPharmacies();
        setReportedPharmacies(pharmaciesData.length);

        const uploadsData = await fetchUploads();
        setUploads(uploadsData?.length || 0);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col p-5 bg-gray-100 min-h-screen font-['Inter',sans-serif] nh:p-3 nhm:p-4">
        <div className="flex flex-wrap justify-around mb-0 nh:mb-3 nhm:mb-4">
          <div className="bg-[#040530] w-[300px] my-2 h-[120px] rounded-lg p-4 flex flex-col items-center justify-center nh:w-[220px] nh:h-[120px] nh:my-3 nhm:w-[260px] nhm:h-[140px] nhm:my-4">
            <p className="text-lg font-semibold text-white nh:text-base nhm:text-lg">No of Uploads</p>
            <h3 className="text-3xl font-bold text-white mt-2 nh:text-2xl nhm:text-3xl">{uploads}</h3>
          </div>

          <div className="bg-[#040530] mb-0 w-[300px] my-2 h-[120px] rounded-lg p-4 flex flex-col items-center justify-center nh:w-[220px] nh:h-[120px] nh:my-3 nhm:w-[260px] nhm:h-[140px] nhm:my-4">
            <p className="text-lg font-semibold text-white nh:text-base nhm:text-lg">Flagged Pharmacies</p>
            <h3 className="text-3xl font-bold text-white mt-2 nh:text-2xl nhm:text-3xl">{reportedPharmacies}</h3>
          </div>
        </div>

        <div className="w-full max-w-screen-lg ">
          <ChartComponent />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;


