import React from 'react';
import Image from 'next/image';

const CheckDrugStatus = () => {
  return (
    <div id='home'>
      <div className="flex flex-col justify-center items-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-center items-center space-x-0 lg:space-x-20 w-full mb-10">

          <div className="mb-10 lg:mb-0"> 
            <Image src="/images/check.jpeg" alt="check" width={900} height={600} className='mt-[10%] mx-auto lg:mx-0' />
          </div>
          <div className='ml-0 lg:ml-[10%] flex flex-col items-center lg:items-start'>
            <h2 className="text-2xl font-semibold mb-6 lg:text-[48px] text-center lg:text-left"> 
              Check On Your Drug Status Today!
            </h2>
            <p className="text-black mb-8 text-[20px] lg:text-[35px] text-center lg:text-left"> 
              Ensure the safety of the medications you use by easily checking if a drug has been recalled or not.
            </p>
            <button className="text-white px-8 py-4 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-offset-2" style={{ backgroundColor: '#1B264F' }}>
              Check drug
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckDrugStatus;
