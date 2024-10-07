"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaHome, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa'; 
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white z-50 md:top-0">
      <div className="flex items-center justify-between h-20">
        <div className="flex-shrink-0 ml-[3%] mt-[2%] md:mt-[5%] md:mb-[3%]">
        <Image src="/images/logo.png" alt="logo" width={120} height={60}/>
        </div>

        <div className="hidden md:flex space-x-24 font-bold text-black mr-[5%] text-[20px] mt-[4%] md:mb-[3%] darker-grotesque">
          <Link href="#home" className="text-red-500">Home</Link>
          <Link href="#checkdrug" className="text-black">Check Drug Status</Link>
          <Link href="#ourproduct" className="text-black">Pharmacy Finder</Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md text-[20px] fixed inset-0 flex flex-col justify-center items-center space-y-5 z-50 darker-grotesque">
        <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-black focus:outline-none">
           <FaTimes size={24} />
        </button>

          <Link href="#home" className="block text-red-500">Home</Link>
          <Link href="#checkdrug" className="block text-black">Check Drug Status</Link>
          <Link href="#ourproduct" className="block text-black">Pharmacy Finder</Link>
        </div>
      )}

      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t-md flex justify-around items-center py-3 z-50">
        <Link href="#home" className="flex flex-col items-center text-black">
          <FaHome size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="#checkdrug" className="flex flex-col items-center text-black">
          <FaInfoCircle size={24} />
          <span className="text-xs">Status</span>
        </Link>
        <Link href="#ourproduct" className="flex flex-col items-center text-black">
          <FaMapMarkerAlt size={24} />
          <span className="text-xs">Pharmacy</span>
        </Link>
      </div>
    </nav>
  );
}
