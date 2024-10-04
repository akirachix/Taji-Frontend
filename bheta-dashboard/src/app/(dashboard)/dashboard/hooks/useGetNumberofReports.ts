
import { useEffect, useState } from 'react';

export const useFetchPharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch('/api/reports'); 
        const data = await response.json();
        console.log({data});
        
        setPharmacies(data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchPharmacies();
  }, []);

  return pharmacies; 
};
