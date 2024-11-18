"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CameraIcon, RefreshCwIcon, X } from 'lucide-react';
import Navbar from '../Navbar';
import { useRouter } from 'next/navigation';

const Camerapermission = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [showResponsePage, setShowResponsePage] = useState<boolean>(false);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(false);
  const router = useRouter();

  const startCamera = useCallback(async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 380 }, 
          height: { ideal: 220 },
          facingMode: isFrontCamera ? 'user' : 'environment'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);
        setCameraStarted(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  }, [isFrontCamera]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  const captureImage = async () => {
    if (!cameraStarted) {
      await startCamera();
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg', 1.0);
        setCapturedImage(imageDataUrl);
      }
    }
  };

  const handleImageUpload = async () => {
    if (!capturedImage) {
      setResponseMessage('Please capture an image first.');
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();

    const response = await fetch(capturedImage);
    const blob = await response.blob();
    formData.append('image_file', blob, 'captured_image.jpg');

    try {
      const apiResponse = await fetch('https://bheta-solution-4f9d1da807f3.herokuapp.com/api/image-upload/', {
        method: 'POST',
        body: formData,
      });

      const data = await apiResponse.json();

      if (apiResponse.ok) { 
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
  const ResponsePage: React.FC = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-10 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg space-y-6">
        <button 
          onClick={() => {
            setShowResponsePage(false);
            router.push('/pwa/landing/');
          }}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
        <h2 className="text-2xl font-bold text-center">Drug Status</h2>
        <p className="text-center">{responseMessage}</p>
       
      </div>
    </div>
  );

  return (
    <>
    <Navbar/>
    <div id='permission' className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl relative">
          {isProcessing ? (
            <div className="text-center">
              <p className="mb-4">Processing...</p>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div className="w-1/2 h-full bg-blue-600 rounded animate-pulse"></div>
              </div>
            </div>
          ) : capturedImage ? (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-10 w-3/4 md:w-1/2 lg:w-2/3 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-center">Captured Image</h2>
                <Image src={capturedImage} alt="Captured" className="w-64 h-64 object-cover rounded-lg mx-auto" width={200} height={256} />
                <div className="flex justify-around mt-6">
                  <Link href="/pwa/takepicture">
                    <button
                      className="px-4 py-2 bg-white text-black rounded-lg"
                    >
                      Go Back
                    </button>
                  </Link>
                  <button
                    className="px-4 py-2 text-white rounded-lg"
                    style={{ backgroundColor: '#1B264F' }}
                    onClick={handleImageUpload}
                  >
                    {isProcessing ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline className="w-full object-cover rounded-lg" />
              <div className="absolute top-4 right-4">
                <button 
                  onClick={toggleCamera}
                  className="p-2 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <RefreshCwIcon className="w-6 h-6 text-gray-800" />
                </button>
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={captureImage}
                  className="w-16 h-16 bg-black border-4 border-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <CameraIcon className="w-8 h-8 text-white" />
                </button>
              </div>
            </>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} width="800" height="600" />
        </div>
      </main>
      {showResponsePage && <ResponsePage />}
    </div>
    </>
  );
}

export default Camerapermission;