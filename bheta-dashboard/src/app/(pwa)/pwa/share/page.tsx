'use client';
import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

interface ShareButtonsProps {
  responseMessage: string;
  onClose: () => void;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ responseMessage, onClose }) => {
  const message = `Drug Status: ${responseMessage}`;

  const shareToWhatsApp = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(shareUrl, '_blank');
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(message)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 border border-black bg-white rounded-xl shadow-md py-4 sm:py-8 px-6 sm:px-12 flex flex-col items-center justify-center sm:justify-start gap-4 mt-[5%] sm:mt-[10%] w-[90%] sm:w-auto">
      <p className="text-center font-semibold mb-4 darker grotesque">Share your drug status via</p>
      <div className="flex flex-row gap-14 sm:gap-12 lg:gap-40">
        <div className="flex flex-col items-center">
          <button
            onClick={shareToWhatsApp}
            className="text-black hover:text-green-600 transition-colors"
            aria-label="Share to WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 sm:w-12 sm:h-12"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
          <span className="mt-2 text-sm darker grotesque">WhatsApp</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={shareToFacebook}
            className="text-black hover:text-blue-600 transition-colors"
            aria-label="Share to Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 sm:w-12 sm:h-12"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </button>
          <span className="mt-2 text-sm darker grotesque">Facebook</span>
        </div>
      </div>
     <Link href="/pwa/landing">
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
      </Link>
    </div>
  );
};

export default ShareButtons;