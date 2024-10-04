import { Pharmacy } from "./types";
const url = '/api/reports';
export const fetchPharmacies = async (): Promise<Pharmacy[]> => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data as Pharmacy[];
    } catch (error) {
        console.error('Error fetching pharmacies:', error);
        throw new Error(error instanceof Error ? error.message : 'An error occurred while fetching pharmacies');
    }
};