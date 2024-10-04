import { useEffect, useState } from 'react';

type Pharmacy = {
  name: string;
  license_status: string;
  reported: boolean;
  report_count: number; 
};

export const useFetchNumberOfTImes = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]); 

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch('/api/reports'); 
        const data = await response.json();
        console.log({ data });
        
        setPharmacies(data); 
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchPharmacies(); 
  }, []);

  return pharmacies; 
};
