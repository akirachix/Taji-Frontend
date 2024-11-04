'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import Navbar from '../Navbar';
import { X } from 'lucide-react';

const ImageUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [, setIsProcessing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [showResponsePage, setShowResponsePage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setResponseMessage('Please select an image to upload.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image_file', imageFile);

    try {
      const response = await fetch('https://bheta-solution-4f9d1da807f3.herokuapp.com/api/image-upload/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) { 
        const responseValue = Object.values(data)[0];
        setResponseMessage(typeof responseValue === 'string' ? responseValue : JSON.stringify(responseValue));
      } else {
       
        setResponseMessage(data.error || 'Failed to upload the image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setResponseMessage('Something went wrong while uploading the image.');
    } finally {
      setIsProcessing(false);
      setShowResponsePage(true);
    }
  };

  const handleShare = () => {
    console.log('Sharing response');
  };

  const handleReport = () => {
    console.log('Report response');
  };

  const ResponsePage: React.FC = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-10 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg space-y-6">
        <button 
          onClick={() => setShowResponsePage(false)}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <h2 className="text-2xl font-bold text-center">Drug Status</h2>
        <p className="text-center">{responseMessage}</p>
        <div className="flex justify-around mt-6">
          <Link href="/pwa/share">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleShare}
            >
              Share
            </button>
          </Link>
          <Link href="/pwa/pharmacy">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={handleReport}
            >
              Report
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div id="checkdrug">
        <div className="bg-white">
          <main>
            <div className="container pt-24 sm:pt-16 pb-24 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="">

                  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-[3%] lg:mt-[5%] lg:ml-[8%]">
            <div className="flex justify-center mt-[3%] lg:mt-[5%]   order-1 md:order-1 ">
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
              <h3 className="font-semibold text-[20px] sm:text-[24px] md:text-[30px] mb-2 sm:mb-4  text-center sm:whitespace-nowrap mt-[5%] darker grotesque ">
              Select an Image Showing a Batch Number on Your Medication</h3>
                <ol className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque ">1.</span>
                    <span className="text-xl md:text-2xl darker grotesque ">Usually printed in black ink.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque ">2.</span>
                    <span className="text-xl md:text-2xl darker grotesque ">May be preceded by 'Batch No.', 'Lot', or 'LOT NO'</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque ">3.</span>
                    <span className="text-xl md:text-2xl darker grotesque ">Often Near the expiry date.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque">4.</span>
                    <span className="text-xl md:text-2xl darker grotesque">The batch number may look like this 'B12345' or 'LOT2023A3'</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-xl md:text-2xl darker grotesque">5.</span>
                    <span className="text-xl md:text-2xl darker grotesque">It is found on the sides of the package, bottom or near barcode</span>
                  </li>
                </ol>
              </div>
              
              <div className="flex gap-6 sm:gap-24 w-full">
                <Link href='/pwa/landing' className="w-full sm:w-auto">
                  <button
                    className="w-full flex items-center justify-center px-5 sm:px-10 py-4 sm:py-4 border-2 border-black text-black text-[16px] sm:text-[18px] rounded-[8px] sm:rounded-[12px] focus:outline-none focus:ring-2 focus:ring-offset-2 darker grotesque"
                    style={{ backgroundColor: '#FFFFFF' }}>
                    Back
                  </button>
                </Link>
                <button
        className="w-full sm:w-auto px-5 py-4 text-white rounded-lg text-[16px] sm:text-[18px] darker grotesque"
        style={{ backgroundColor: '#1B264F' }}
        onClick={handleUploadClick}>
        Upload from Gallery
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
              </div>
            </div>
          </div>
                  
                  {selectedImage && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                      <div className="bg-white p-8 w-11/12 md:w-3/4 max-w-4xl rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-6 darker grotesque">Preview Selected Image</h2>
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                          <Image 
                            src={selectedImage} 
                            alt="Selected" 
                            className="w-full h-full object-contain" 
                            width={400} 
                            height={300} 
                          />
                        </div>
                        <div className="flex justify-between">
                          <button
                            className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors darker grotesque"
                            onClick={() => {
                              setSelectedImage(null);
                              setImageFile(null);
                              setResponseMessage('');
                            }}>
                            Back
                          </button>
                          <button
                            className="px-6 py-2 text-white rounded-lg"
                            style={{ backgroundColor: '#1B264F' }}
                            onClick={handleImageUpload}
                          >
                            {isLoading ? 'Uploading...' : 'Upload'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {showResponsePage && <ResponsePage />}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;

