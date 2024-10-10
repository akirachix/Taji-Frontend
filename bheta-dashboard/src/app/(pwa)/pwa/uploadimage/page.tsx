'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import Navbar from '../Navbar';

const ImageUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
        setResponseMessage(`Response: ${JSON.stringify(data)}`);
      } else {
        setResponseMessage(`Error: ${data.error || 'Failed to upload the image'}`);
      }
    } catch (error) {
      console.log(error);
      
      setResponseMessage('Something went wrong while uploading the image.');
    } finally {
      setIsLoading(false);
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
      <div className="bg-white p-10 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">Upload Response</h2>
        <p className="text-center">{responseMessage}</p>
        <div className="flex justify-around mt-6">
          <Link href="/pwa/share">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleShare}>
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
        <button
          className="w-full px-4 py-2 bg-gray-300 text-black rounded-lg"
          onClick={() => setShowResponsePage(false)}
        >
          Back to Upload
        </button>
      </div>
    </div>
  );

  return (
    <>
   <Navbar/>
        <div id="checkdrug">
      <div className="bg-white">
        <main className="mx-auto py-6 sm:px-6 lg:px-8 mt-[4%]">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-[2%] ml-[5%] mr-[5%] md:mt-[3%]">
              <div className="md:w-1/2">
                <h1 className="text-[20px] font-bold text-black mb-4 md:text-[40px] darker grotesque">
                  Check On Your Drug Status Today!
                </h1>
                <p className="text-black mb-6 hidden md:block grotesque md:text-[40px] text-[15px]">
                 Ensure the safety of the medications you use by easily checking if a drug has been recalled.
                 Simply upload a clear image or take a photo of the drug packaging, making sure the batch number in the picture is visible.
                   </p>

              </div>

              <div className="flex flex-col space-y-8 items-center mr-[8%] md:mr-[20%]">
                {!selectedImage ? (
                  <>
                  <Link href='/pwa/takepicture'>
                    <button
                      className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-navy-blue" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"/>
                      </svg>
                      <span className="text-lg font-medium text-navy-blue">Take a picture</span>
                    </button>
                     </Link>
                    <button
                      className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition-colors"
                      onClick={handleUploadClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-navy-blue" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-lg font-medium text-navy-blue">Upload from gallery</span>
                    </button>

                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </>
                ) : null}
              </div>
            </div>

            {selectedImage && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-10 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg space-y-6">
                  <h2 className="text-2xl font-bold text-center">Selected Image</h2>
                  <Image src={selectedImage} alt="Selected" className="w-64 h-64 object-cover rounded-lg mx-auto" width={0} height={0} />
                  <div className="flex justify-around mt-6 ">
                    <button
                      className="px-4 py-2 bg-white text-black rounded-lg"
                      onClick={() => {
                        setSelectedImage(null); 
                        setImageFile(null); 
                        setResponseMessage('');
                      }}
                    >
                      Go Back
                    </button>

                    <button
                      className="px-4 py-2 text-white rounded-lg"
                      style={{ backgroundColor: '#1B264F' }}
                      onClick={handleImageUpload}
                    ><div id="checkdrug">
                    <div className="bg-white">
                      <main className="mx-auto py-6 sm:px-6 lg:px-8 mt-[4%]">
                        <div className="px-4 py-6 sm:px-0">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-[2%] ml-[5%] mr-[5%] md:mt-[3%]">
                            <div className="md:w-1/2">
                              <h1 className="text-[20px] font-bold text-black mb-4 md:text-[40px] darker grotesque">
                                Check On Your Drug Status Today!
                              </h1>
                              <p className="text-black mb-6 hidden md:block grotesque md:text-[40px] text-[15px]">
                               Ensure the safety of the medications you use by easily checking if a drug has been recalled.
                               Simply upload a clear image or take a photo of the drug packaging, making sure the batch number in the picture is visible.
                                 </p>
              
                            </div>
              
                            <div className="flex flex-col space-y-8 items-center mr-[8%] md:mr-[20%]">
                              {!selectedImage ? (
                                <>
                                <Link href='/pwa/takepicture'>
                                  <button
                                    className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-navy-blue" viewBox="0 0 20 20" fill="currentColor">
                                      <path
                                        fillRule="evenodd"
                                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                        clipRule="evenodd"/>
                                    </svg>
                                    <span className="text-lg font-medium text-navy-blue">Take a picture</span>
                                  </button>
                                   </Link>
                                  <button
                                    className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition-colors"
                                    onClick={handleUploadClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-navy-blue" viewBox="0 0 20 20" fill="currentColor">
                                      <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <span className="text-lg font-medium text-navy-blue">Upload from gallery</span>
                                  </button>
              
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                  />
                                </>
                              ) : null}
                            </div>
                          </div>
              
                          {selectedImage && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                              <div className="bg-white p-10 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg space-y-6">
                                <h2 className="text-2xl font-bold text-center">Selected Image</h2>
                                <Image src={selectedImage} alt="Selected" className="w-64 h-64 object-cover rounded-lg mx-auto" width={0} height={0} />
                                <div className="flex justify-around mt-6 ">
                                  <button
                                    className="px-4 py-2 bg-white text-black rounded-lg"
                                    onClick={() => {
                                      setSelectedImage(null); 
                                      setImageFile(null); 
                                      setResponseMessage('');
                                    }}
                                  >
                                    Go Back
                                  </button>
              
                                  <button
                                    className="px-4 py-2 text-white rounded-lg"
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
                      </main>
                    </div>
                  </div>
                      {isLoading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showResponsePage && <ResponsePage />}
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default ImageUpload;