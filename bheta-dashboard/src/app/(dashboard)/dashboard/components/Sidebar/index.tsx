import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdHome, MdBarChart, MdDescription } from 'react-icons/md';

const Sidebar: React.FC = () => {
  return (
    <div className=" text-white  flex flex-col bg-[#040530] w-80 z-10 h-screen p-5 sticky top-0">
      <div className="mb-8">
      <Image src="/images/image.png" alt="Logo" width={200} height={180} />
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard/dashboardpage" className="flex items-center space-x-2 hover:bg-blue-800 p-2 rounded text-[30px] mt-[40%] ml-[10%]">
              <MdHome size={40} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
           
          </li>
          <li>
            <Link href="/dashboard/reports" className="flex items-center space-x-2 hover:bg-blue-800 p-2 rounded text-[30px] mt-[60%] ml-[10%]">
              <MdDescription size={40} />
              <span>Reports</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;