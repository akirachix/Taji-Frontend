"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaHome, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const checkDrugStatusPaths = [
    '/pwa/landing',
    '/pwa/uploadimage',  
    '/pwa/takepicture',
    '/pwa/share',
    '/pwa/camera',
    '/pwa/camerapermission'
  ];

  const isActive = (path: string): boolean => {
     if (path === '/pwa/Homepage') {
      return pathname === '/pwa/Homepage' || pathname === '/';
    }
    if (path === '/pwa/landing') {
      return checkDrugStatusPaths.includes(pathname);
    }
    return pathname === path;
  };

  const getLinkClass = (path: string): string => {
    return `text-${isActive(path) ? 'red-500' : 'black'}`;
  };

  return (
    <nav className="bg-white z-50 md:top-0">
      <div className="flex items-center justify-between h-20">
        <div className="flex-shrink-0 ml-[3%] mt-[2%] md:mt-[5%] md:mb-[3%]">
          <Image src="/images/logo.png" alt="logo" width={120} height={60}/>
        </div>
        
        <div className="hidden md:flex space-x-24 font-bold text-black mr-[5%] text-[20px] mt-[4%] md:mb-[3%] darker-grotesque">
          <Link href="/pwa/Homepage" className={getLinkClass('/pwa/Homepage')}>Home</Link>
          <Link href="/pwa/landing" className={getLinkClass('/pwa/landing')}>Check Drug Status</Link>
          <Link href="/pwa/map" className={getLinkClass('/pwa/map')}>Pharmacy Finder</Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md text-[20px] fixed inset-0 flex flex-col justify-center items-center space-y-5 z-50 darker-grotesque">
          <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-black focus:outline-none">
            <FaTimes size={24} />
          </button>
          <Link href="/pwa/Homepage" className={getLinkClass('/pwa/Homepage')}>Home</Link>
          <Link href="/pwa/landing" className={getLinkClass('/pwa/landing')}>Check Drug Status</Link>
          <Link href="/pwa/map" className={getLinkClass('/pwa/map')}>Pharmacy Finder</Link>
        </div>
      )}
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t-md flex justify-around items-center py-3 z-50">
        <Link href="/pwa/Homepage" className={`flex flex-col items-center ${getLinkClass('/pwa/Homepage')}`}>
          <FaHome size={30} />
          <span className="text-10px darker grotesque ">Home</span>
        </Link>
        <Link href="/pwa/landing" className={`flex flex-col items-center ${getLinkClass('/pwa/landing')}`}>
          <FaInfoCircle size={30} />
          <span className="text-10px darker grotesque ">Check Drug Status</span>
        </Link>
        <Link href="/pwa/map" className={`flex flex-col items-center ${getLinkClass('/pwa/map')}`}>
          <FaMapMarkerAlt size={30} />
          <span className="text-10px darker grotesque ">Pharmacy Finder</span>
        </Link>
      </div>
    </nav>
  );
}