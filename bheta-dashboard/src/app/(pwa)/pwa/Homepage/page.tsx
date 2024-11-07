import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../Navbar';
const CheckDrugStatus = () => {
  return (
    <>
      <Navbar/>
      <div id='home'>
        <div className="flex flex-col justify-center items-center bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-24 w-full mb-12">
            <div className="mb-6 lg:mb-0 w-full lg:w-auto lg:mt-[2%]">
              <Image
                src="/images/page.png"
                alt="check"
                width={500}
                height={400}
                className="mt-[1%] lg:mt-[6%] sm:w-200 sm:h-200 border-2 border-gray-300 rounded-lg"
              />
            </div>
            <div className='w-full lg:w-auto flex flex-col items-center lg:items-start p-4 sm:p-6 lg:p-8'>
  <h2 className="text-[28px] sm:text-[28px] md:text-[35px] lg:text-[48px] font-semibold mb-4 text-center lg:text-left mt-[1%] lg:mt-[5%] darker grotesque">
    Stay Safe With Every Dose!
  </h2>
  <p className="text-black mb-6 text-[22px] sm:text-[18px] md:text-[20px] lg:text-[32px] text-center lg:text-left leading-relaxed lg:mt-[2%] darker grotesque ">
    Your health matters. With our easy-to-use tool, instantly <br className="hidden sm:block" /> verify the safety and authenticity of your medication. <br className="hidden sm:block" /> Avoid recalled drugs and feel confident in every <br className="hidden sm:block" /> purchase.
  </p>
  <Link href="/pwa/landing">
    <button className="text-white px-12 sm:px-12 py-4 sm:py-5 rounded-[8px] sm:rounded-[12px] focus:outline-none focus:ring-2 focus:ring-offset-2 darker grotesque text-[18px] lg:text-[20px]" style={{ backgroundColor: '#1B264F' }}>
      Check drug
    </button>
  </Link>
</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckDrugStatus;