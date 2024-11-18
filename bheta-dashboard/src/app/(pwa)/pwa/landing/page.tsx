"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import Navbar from '../Navbar';
import Link from 'next/link';

const VerifyMedication = () => {
  const [selectedFile] = useState<File | null>(null);

  return (
    <>
      <Navbar />
      <div id='home'>
        <div className="flex flex-col justify-center items-center bg-white  sm:px-6 lg:px-8 lg:pt-10">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-20 w-full mb-10">
            
            <div className=" lg:mb-0 w-full lg:w-auto rounded-lg">
              <Image
                src="/images/picture.png" 
                alt="Medication verification illustration"
                width={604}
                height={604}
                className="mt-[2%] mx-auto w-full sm:w-4/5 md:w-3/4 lg:w-auto" 
                priority
              />
            </div>

            <div className="lg:w-auto flex flex-col items-center lg:items-start sm:p-6 lg:p-8 pb-10">
              <h2 className="text-[20px] sm:text-[28px] md:text-[35px] lg:text-[48px] font-semibold mt-2 text-center lg:text-left max-w-full sm:max-w-xl darker grotesque">
                Verify Your Medication
              </h2>

              <p className="text-black mb-4 text-[19px] sm:text-[21px] md:text-[28px] lg:text-[30px] text-center lg:text-left leading-relaxed max-w-full darker grotesque ">
                To verify your medication, select either way:
              </p>

              <div className="space-y-6 w-full max-w-full sm:max-w-xl lg:max-w-none">
                <div>
                  <p className="text-[20px] sm:text-[24px] lg:text-[28px]  font-semibold text-center lg:text-left darker grotesque ">Capture the batch number:</p>
                  <p className="text-black text-[19px] sm:text-[22px] lg:text-[28px] lg:mb-4 text-center lg:text-left  darker grotesque">
                    Take a clear picture of a batch number on your medication package.
                  </p>
                </div>

                <div>
                  <p className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold  text-center lg:text-left darker grotesque ">Upload From Gallery:</p>
                  <p className="text-black text-[19px] sm:text-[24px] lg:text-[28px] lg:mb-2 text-center lg:text-left darker grotesque ">
                    Select an image from your device that clearly shows a batch number.
                  </p>
                </div>
                {selectedFile && (
                  <div className="text-sm text-green-600">
                    Selected: {selectedFile.name}
                  </div>
                )}

                <div className="flex gap-6 sm:gap-12 w-full lg:mt-[10%]">
                  <Link href='/pwa/takepicture' className="w-full sm:w-auto">
                    <button
                      className="w-full flex items-center justify-center px-8 sm:px-6 py-5 sm:py-4 text-white text-[15px] sm:text-[16px] rounded-[8px] sm:rounded-[12px] focus:outline-none focus:ring-2 focus:ring-offset-2 darker grotesque "
                      style={{ backgroundColor: '#1B264F' }}
                    >
                      <Camera className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                      Take Picture
                    </button>
                  </Link>
                  <Link href='/pwa/uploadimage' className="w-full sm:w-auto">
                    <button
                      className="w-full flex items-center justify-center px-8 sm:px-6 py-5 sm:py-4  text-white text-[14px] sm:text-[16px] rounded-[8px] sm:rounded-[12px] focus:outline-none focus:ring-2 focus:ring-offset-2 darker grotesque "
                      style={{ backgroundColor: '#1B264F' }}>
                      Upload Gallery
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyMedication;