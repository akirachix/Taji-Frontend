"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../Navbar';

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="container pt-24 sm:pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-[3%] lg:mt-[5%] lg:ml-[8%]">
            <div className="flex justify-center lg:mt-[5%] order-1 md:order-1 ">
              <Image
                src="/images/pop.jpg"
                alt="check"
                width={400}
                height={300}
                className="w-full max-w-sm h-auto object-contain border-1 border-black rounded-xl"
                priority
              />
            </div>
            
            <div className="flex flex-col space-y-8 order-2 md:order-2">
              <div className="space-y-6">
              <h3 className="font-semibold text-[22px] sm:text-[24px] md:text-[30px] mb-2 sm:mb-4 text-center  sm:whitespace-nowrap mt-[5%] darker grotesque mr-[10%]">
              Located a Batch Number on Your Medication</h3>
                <ol className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque ">1.</span>
                    <span className="text-xl md:text-2xl darker grotesque ">Usually printed in black ink.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque ">2.</span>
                    <span className="text-[20px] md:text-2xl darker grotesque">May be preceded by Batch No or LOT NO</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque ">3.</span>
                    <span className="text-[20px] md:text-2xl darker grotesque ">Often Near the expiry date.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque ">4.</span>
                    <span className="text-xl md:text-2xl darker grotesque ">The batch number may look like this B12345 or LOT2023A3</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque ">5.</span>
                    <span className="text-xl md:text-2xl darker grotesque ">It is found on the sides of the package, bottom or near barcode</span>
                  </li>
                </ol>
              </div>
              
              <div className="flex gap-6 sm:gap-24 w-full">
                <Link href='/pwa/landing' className="w-full sm:w-auto">
                  <button
                    className="w-full flex items-center justify-center px-2 sm:px-10 py-4 sm:py-4 border-2 border-black text-black text-[16px] sm:text-[18px] rounded-[8px] sm:rounded-[12px] focus:outline-none focus:ring-2 focus:ring-offset-2 darker grotesque "
                    style={{ backgroundColor: '#FFFFFF' }}>
                    Back
                  </button>
                </Link>
                <Link href='/pwa/camera' className="w-full sm:w-auto">
                  <button
                    className="w-full flex items-center justify-center px-2 sm:px-10 py-4 sm:py-4 text-white text-[16px] sm:text-[18px] rounded-[8px] sm:rounded-[12px] focus:outline-none focus:ring-2 focus:ring-offset-2 darker grotesque "
                    style={{ backgroundColor: '#1B264F' }}>
                    Take Picture
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
};

export default Landing;
