export interface UploadData {
    email: string;
    password: string;
  }


  export interface Pharmacy {
    name: string;
    license_status: string;
    reported:boolean;
  }  
  

  export type Pharmacies = {
    name: string;
    license_status: string;
    reported: number;  
  };