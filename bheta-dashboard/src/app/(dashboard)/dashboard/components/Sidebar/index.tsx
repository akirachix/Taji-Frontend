'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();
  const navItems = [
    { name: 'dashboard', icon: 'home.png', path: '/dashboard' },
    { name: 'report', icon: 'reports.png', path: '/reports' },
  ];

  return (
    <div className="bg-[#040530] w-64 h-screen sticky top-0 z-10 flex flex-col">
      <div className="text-center mt-8 mb-20"> 
        <img src="/images/bhetalogo.png" alt="Bheta Logo" className="mx-auto" /> 
      </div>

      <nav className="flex-grow flex flex-col justify-start space-y-8">
        {navItems.map((item) => (
          <Link href={item.path} key={item.name}>
            <div
              className={`flex items-center gap-4 text-white py-4 hover:bg-[#eeeae8] rounded-md px-6 transition ${
                pathname === item.path ? 'bg-[#e02d2d]' : ''
              }`}>
              <Image
                src={`/images/${item.icon}`}
                alt={item.name}
                width={28}
                height={28}
              />
              <h2 className="text-lg font-medium capitalize">
                {item.name}
              </h2>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
