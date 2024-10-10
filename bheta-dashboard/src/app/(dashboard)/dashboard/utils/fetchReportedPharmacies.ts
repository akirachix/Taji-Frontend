const reportedPharmacies = '/api/pharmacies/?reported'; 

export const fetchReportedPharmacies = async () => {
    try {
      const response = await fetch(reportedPharmacies); 
      if (!response.ok) {
        throw new Error('Failed to get pharmacies');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred'); 
      }
    }
  };