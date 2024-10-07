const uploads= '/api/uploads';


export const fetchUploads= async () => {
    try {
      const response = await fetch(`${uploads}`);
      if (!response.ok) {
        throw new Error('Failed image uploads');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };