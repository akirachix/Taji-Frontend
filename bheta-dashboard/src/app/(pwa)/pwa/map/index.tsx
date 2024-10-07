"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../component/ui/alert';
import { Loader } from 'lucide-react';
import Image from 'next/image';

declare global {
  interface Window {
    google: typeof google | undefined;
    initMap: () => void;
    promptDirections: (placeId: string, placeName: string) => void;
  }
}

const PharmacyHospitalFinder: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, setMapLoaded] = useState(false);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [showDirectionsPanel, setShowDirectionsPanel] = useState(false);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [showDirectionsPrompt, setShowDirectionsPrompt] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ id: string; name: string } | null>(null);
  const API_KEY = "AIzaSyBBYsZVdFOBv3is6gNS3SbHr_xWY4pkpV8"; 
  const SEARCH_RADIUS = 3000; 

  useEffect(() => {
    setShowLocationPrompt(true);
    loadGoogleMapsScript();

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
          (registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          },
          (err) => {
            console.log('Service Worker registration failed:', err);
          }
        );
      });
    }

    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const loadGoogleMapsScript = () => {
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      setLoading(false);
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      setMapLoaded(true);
      setLoading(false);
      return;
    }

    window.initMap = () => {
      setMapLoaded(true);
      setLoading(false);
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places,geometry&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = (error) => {
      console.error("Error loading Google Maps script:", error);
      setLoading(false);
    };
    document.body.appendChild(script);
  };

  const initMap = (center: google.maps.LatLng | google.maps.LatLngLiteral) => {
    if (!mapRef.current || !window.google) return;

    const mapOptions: google.maps.MapOptions = {
      center: center,
      zoom: 14,
    };
    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    const newDirectionsRenderer = new google.maps.DirectionsRenderer();
    newDirectionsRenderer.setMap(newMap);
    setDirectionsRenderer(newDirectionsRenderer);

    new window.google.maps.Marker({
      position: center,
      map: newMap,
      title: 'Your Location',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      }
    });

    const userCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.15,
      map: newMap,
      center: center,
      radius: SEARCH_RADIUS,
    });

    window.google.maps.event.addListener(newMap, 'zoom_changed', () => {
      const currentZoom = newMap.getZoom();
    
    
      const adjustedRadius = adjustRadiusToZoom(currentZoom ?? 0); 
      userCircle.setRadius(adjustedRadius);
    });
    
    window.google.maps.event.addListener(newMap, 'idle', () => {
      userCircle.setCenter(center); 
    });
    

    findNearbyPharmaciesAndHospitals(newMap, center);
  };

  const adjustRadiusToZoom = (zoomLevel: number) => {
    const radiusMapping: { [key: string]: number } = {
      '14': SEARCH_RADIUS,
      '13': SEARCH_RADIUS * 1.5,
      '12': SEARCH_RADIUS * 2,
      '11': SEARCH_RADIUS * 2.5,
      '10': SEARCH_RADIUS * 3,
    };
  
    return radiusMapping[zoomLevel.toString()] || SEARCH_RADIUS;
  };
  

  const findNearbyPharmaciesAndHospitals = (map: google.maps.Map, location: google.maps.LatLng | google.maps.LatLngLiteral) => {
    const service = new google.maps.places.PlacesService(map);
    const searchTypes = ['pharmacy', 'hospital'];

    searchTypes.forEach(type => {
      const request: google.maps.places.PlaceSearchRequest = {
        location: location,
        radius: SEARCH_RADIUS,
        type: type as string, 
      };
    
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach(place => {
            if (place.geometry && place.geometry.location) {
              const distance = google.maps.geometry.spherical.computeDistanceBetween(
                location,
                place.geometry.location
              );
              if (distance <= SEARCH_RADIUS) {
                createMarker(place, map, type as 'pharmacy' | 'hospital');
              }
            }
          });
        }
      });
    }); 

  };
    

  const createMarker = (place: google.maps.places.PlaceResult, map: google.maps.Map, type: 'pharmacy' | 'hospital') => {
    if (!place.geometry || !place.geometry.location) return;

    const iconUrl = type === 'pharmacy' 
      ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
      icon: {
        url: iconUrl
      },
      label: {
        text: place.name || '',
        color: type === 'pharmacy' ? '#1E7D2B' : '#7D1E2B', 
        fontSize: '14px',
        fontWeight: 'bold'
      }
    });

    google.maps.event.addListener(marker, 'click', () => {
      if (place.place_id && place.name) {
        promptDirections(place.place_id, place.name);
      }
    });
  };

  const promptDirections = (placeId: string, placeName: string) => {
    setSelectedPlace({ id: placeId, name: placeName });
    setShowDirectionsPrompt(true);
  };

  window.promptDirections = promptDirections;

  const showDirections = () => {
    if (!map || !userLocation || !directionsRenderer || !selectedPlace) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: { placeId: selectedPlace.id },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        console.log("Directions Status:", status); 
        console.log("Directions Result:", result); 
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          directionsRenderer.setDirections(result);
          setShowDirectionsPanel(true);
          setShowDirectionsPrompt(false);
          speakDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  };

  const speakDirections = (result: google.maps.DirectionsResult) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      const steps = result.routes[0].legs[0].steps;
      let directionsText = "Starting directions. ";
      
      steps.forEach((step, index) => {
        directionsText += `Step ${index + 1}: ${step.instructions} `;
      });

      directionsText += "You have arrived at your destination.";
      
      speech.text = directionsText;
      speech.volume = 1;
      speech.rate = 0.9;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const handleAcceptLocation = () => {
    setShowLocationPrompt(false);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        setUserLocation(location);
        initMap(location);
      },
      (error) => {
        console.error("Error obtaining location:", error);
        setLoading(false);
      }
    );
  };

  const handleDeclineLocation = () => {
    setShowLocationPrompt(false);
    setLoading(false);
    initMap({ lat: -1.286389, lng: 36.817223 }); 
  };

  const renderDirections = () => {
    if (!directions) return null;
  
    return (
      <div className="bg-white p-4 rounded shadow-lg max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Directions</h2>
        <p className="mb-2">Total distance: {directions.routes[0].legs[0].distance?.text}</p>
        <p className="mb-4">Estimated time: {directions.routes[0].legs[0].duration?.text}</p>
        <ol className="list-decimal list-inside">
          {directions.routes[0].legs[0].steps.map((step: any, index: number) => (
            <li key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: step.instructions }}></li>
          ))}
        </ol>
        <button
          onClick={() => setShowDirectionsPanel(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close Directions
        </button>
      </div>
    );
  };
  

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Loader className="animate-spin" size={48} />
          </div>
        )}
      </div>

      {showLocationPrompt && (
        <div style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)' }}>
          <Alert>
            <AlertTitle>Location Access</AlertTitle>
            <AlertDescription>
              Bheta wants to use your location to find nearby pharmacies and hospitals
              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button
                  onClick={handleDeclineLocation}
                  className="px-4 py-2 bg-gray-200 rounded">
                  Decline
                </button>
                <button
                  onClick={handleAcceptLocation}
                  className="px-4 py-2 bg-blue-500 text-white rounded">
                  Accept
                </button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {showDirectionsPrompt && selectedPlace && (
        <div style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)' }}>
          <Alert>
            <AlertTitle>Get Directions</AlertTitle>
            <AlertDescription>
              Do you want to get directions to {selectedPlace.name}?
              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button
                  onClick={() => setShowDirectionsPrompt(false)}
                  className="px-4 py-2 bg-gray-200 rounded">
                  No
                </button>
                <button
                  onClick={showDirections}
                  className="px-4 py-2 bg-blue-500 text-white rounded">
                  Yes
                </button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {showDirectionsPanel && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '30%', maxWidth: '400px' }}>
          {renderDirections()}
        </div>
      )}

<div className="absolute bottom-1 left-1 bg-white p-4 rounded-lg shadow-md text-lg sm:w-80 md:w-96 lg:w-1/4">
  <h3 className="font-bold mb-4 text-xl">Key</h3>
  <div className="flex items-center mb-2">
    <Image
      src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      alt="Your Location"
      width={24} 
      height={24}
      className="mr-4 w-6 h-6 sm:w-8 sm:h-8"
    />
    <span className="text-blue-600 font-semibold">Your Location</span>
  </div>
  <div className="flex items-center mb-2">
    <Image
      src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      alt="Pharmacy"
      width={24} 
      height={24}
      className="mr-4 w-6 h-6 sm:w-8 sm:h-8"
    />
    <span className="text-green-600 font-semibold">Pharmacy</span>
  </div>
  <div className="flex items-center">
    <Image
      src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      alt="Hospital"
      width={24} 
      height={24}
      className="mr-4 w-6 h-6 sm:w-8 sm:h-8"
    />
    <span className="text-red-600 font-semibold">Hospital</span>
  </div>
</div>


    </div>
  );
};

export default PharmacyHospitalFinder;
