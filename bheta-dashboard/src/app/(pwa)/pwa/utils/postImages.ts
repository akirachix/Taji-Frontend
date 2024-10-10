export const createObjectURL = (file: File): string => {
    return URL.createObjectURL(file);
  };
  
  export const validateImageFile = (file: File | null): string | null => {
    if (!file) {
      return 'Please select an image to upload.';
    }
    return null;
  };