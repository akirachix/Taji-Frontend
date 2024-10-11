'use client';
import React from 'react';
import { useFetchPharmacies } from '../hooks/useGetNumberofReports';
import DashboardLayout from '../components/Layout';
import PharmacyReportChart from '../pharmacies/page';

type Pharmacy = {
  name: string;
  license_status: string;
  reported: boolean;
};

const PharmacyList = () => {
  const pharmacies: Pharmacy[] = useFetchPharmacies();

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 darker grotesque">
        <h1 className="text-[20px] sm:text-[24px] lg:text-[32px] font-bold text-center mb-6">
          Pharmacy License and Report Status
        </h1>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-2 py-2 sm:px-4 sm:py-2 text-left font-bold text-black text-[16px] sm:text-2xl">
                Pharmacy
              </th>
              <th className="border px-2 py-2 sm:px-4 sm:py-2 text-left font-bold text-black text-[16px] sm:text-2xl">
                License Status
              </th>
              <th className="border px-2 py-2 sm:px-4 sm:py-2 text-left font-bold text-black text-[16px] sm:text-2xl">
                Reported
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(pharmacies) && pharmacies.length > 0 ? (
              pharmacies.map((pharmacy: Pharmacy, index: number) => (
                <tr key={index} className="text-xs sm:text-sm lg:text-lg">
                  <td className="border px-2 py-2 sm:px-4 sm:py-4 text-black text-[14px] sm:text-[18px]">
                    {pharmacy.name}
                  </td>
                  <td className="border px-2 py-2 sm:px-4 sm:py-4 text-black text-[14px] sm:text-[18px]">
                    {pharmacy.license_status}
                  </td>
                  <td
                    className={`border px-2 py-2 sm:px-4 sm:py-4 text-[14px] sm:text-[18px] ${
                      pharmacy.reported ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {pharmacy.reported ? 'True' : 'False'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="border px-4 py-2 text-center">
                  No pharmacies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <PharmacyReportChart/>
      </div>
    </DashboardLayout>
  );
};

export default PharmacyList;
