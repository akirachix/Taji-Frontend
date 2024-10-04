
export const fetchAnalyticsData = async () => {
    const response = await fetch('/api/');
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    const data = await response.json();
    return data;
  };
  