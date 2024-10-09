const API_URL = 'https://bheta-solution-4f9d1da807f3.herokuapp.com/api/image-upload/';

export const uploadImage = async (imageFile: File): Promise<{ data: any; error: string | null }> => {
  const formData = new FormData();
  formData.append('image_file', imageFile);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return { data, error: null };
    } else {
      return { data: null, error: data.error || 'Failed to upload the image' };
    }
  } catch (error) {
    return { data: null, error: 'Something went wrong while uploading the image.' };
  }
};