"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import Navbar from '../Navbar';

interface IFormInput {
  pharmacyName: string;
  county: string;
  town: string;
}

interface Pharmacy {
  name: string | null;
  vicinity: string | null;
}

declare global {
  interface Window {
    google: typeof google | undefined;
  }
}


interface ExtendedPlaceSearchRequest extends google.maps.places.PlaceSearchRequest {
  pageToken?: string;
}

const PharmacyReportForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [suggestions, setSuggestions] = useState<Pharmacy[]>([]);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<IFormInput>();


  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBBYsZVdFOBv3is6gNS3SbHr_xWY4pkpV8&libraries=places`;
    script.async = true;
    script.onload = initGoogleMapsServices;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initGoogleMapsServices = () => {
    if (window.google) {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      const center = new google.maps.LatLng(-1.286389, 36.817223); 
      const radius = 100000; 

      const searchNearbyPharmacies = (token?: string) => {
        const request: ExtendedPlaceSearchRequest = {
          location: center,
          radius: radius,
          type: 'pharmacy',
          pageToken: token
        };

        service.nearbySearch(request, (results, status, pagination) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPharmacies(prevPharmacies => [...prevPharmacies, ...results as Pharmacy[]]);

            if (pagination && pagination.hasNextPage) {
             
              setTimeout(() => {
                pagination.nextPage();
              }, 2000); 
            }
          }
        });
      };

    
      searchNearbyPharmacies();
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    console.log(data);
    setIsSubmitted(true);
  };

  const handleCancel = () => {
    reset();
    setSuggestions([]);
  };

  const handlePharmacyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('pharmacyName', value);

    if (value.length > 0) {
      const filteredPharmacies = pharmacies.filter(pharmacy => 
        pharmacy.name?.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredPharmacies);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (pharmacy: Pharmacy) => {
    const pharmacyName = pharmacy.name || '';
    const vicinityParts = pharmacy.vicinity?.split(', ') || [];
    const town = vicinityParts[0] || '';
    const county = "Nairobi";

    setValue('pharmacyName', pharmacyName);
    setValue('town', town);
    setValue('county', county);
    setSuggestions([]);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-56">
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
          <p>You have successfully reported {watch('pharmacyName')}</p>
          <p>pharmacy. Thank you for your help. Let us keep our health safe.</p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              reset();
            }}
            className="mt-4 px-4 py-2 bg-blue-900 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    
    <>
  <Navbar />
  <div id="pharmacy" className="overflow-auto">
    <div className="flex flex-col lg:flex-row ml-[2%] lg:ml-[15%]">
      <div className="mt-[5%] mx-auto lg:mx-0">
        <Image
          src="/images/form animated.png"
          alt="logo"
          width={300}
          height={100}
          className="w-[300px] h-[280px] lg:w-[600px] lg:h-[550px]"
        />
      </div>
      
      <div className="items-center lg:ml-[10%] w-full lg:w-[600px] mt-[10%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-300 p-6 rounded-lg shadow-lg max-h-[70vh] lg:max-h-[65vh] overflow-y-auto pb-[80px]"
        >
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">Input Pharmacy Name</label>
            <input
              type="text"
              {...register("pharmacyName", { required: "Pharmacy name is required" })}
              onChange={handlePharmacyNameChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
            {errors.pharmacyName && (
              <p className="text-red-600">{errors.pharmacyName?.message}</p>
            )}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-[150px] overflow-y-auto transition-opacity duration-300 ease-in-out">
                {suggestions.map((pharmacy, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(pharmacy)}
                  >
                    {pharmacy.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-3">County</label>
            <input
              type="text"
              {...register("county", { required: "County is required" })}
              className="w-full p-2 border border-gray-400 rounded"
              readOnly
            />
            {errors.county && <p className="text-red-600">{errors.county?.message}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Town</label>
            <input
              type="text"
              {...register("town", { required: "Town is required" })}
              className="w-full p-2 border border-gray-400 rounded"
              readOnly
            />
            {errors.town && <p className="text-red-600">{errors.town?.message}</p>}
          </div>
          
          <div className="flex flex-row justify-between mt-[8%]">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            
            <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded">
              Report Pharmacy
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</>


  
  );
};

export default PharmacyReportForm;




















