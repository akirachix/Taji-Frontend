import { NextResponse } from 'next/server';

const API_URL = 'https://bheta-solution-4f9d1da807f3.herokuapp.com/api/image-upload/';

interface UploadResponse {
  url?: string;
}

export const uploadImage = async (imageFile: File): Promise<{ data: UploadResponse | null; error: string | null }> => {
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
    console.error('Error while uploading the image:', error);
    return { data: null, error: 'Something went wrong while uploading the image.' };
  }
};

export async function POST(request: Request) {
  const { imageFile } = await request.json();

  const { data, error } = await uploadImage(imageFile);

  if (error) {
    return NextResponse.json({ data: null, error }, { status: 400 });
  }

  return NextResponse.json({ data, error: null });
}
