const API_URL = 'https://bheta-solution-4f9d1da807f3.herokuapp.com/api/image-upload/';

interface UploadResponse {
  url?: string;
  error?: string;
}

interface UploadResult {
  data: UploadResponse | null;
  error: string | null;
}

export const uploadImage = async (imageFile: File): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append('image_file', imageFile);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    const data: UploadResponse = await response.json();

    if (response.ok) {
      return { data, error: null };
    } else {
      return { data: null, error: data.error || 'Failed to upload the image' };
    }
  } catch (error) {
    console.error('Image upload error:', error);
    return { data: null, error: 'Something went wrong while uploading the image.' };
  }
};