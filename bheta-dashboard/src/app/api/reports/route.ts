import { NextRequest, NextResponse } from 'next/server';
const baseUrl = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json(
      { error: 'BASE_URL environment variable is not set.' },
      { status: 500 }
    );
  }
  try {
    const response = await fetch(`${baseUrl}/api/pharmacies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const textResponse = await response.text();
    console.log('Backend response:', textResponse, 'Status:', response.status);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: textResponse || 'Failed to fetch pharmacies.' },
        { status: response.status }
      );
    }

    const result = JSON.parse(textResponse);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error occurred:', (error as Error).message);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' + (error as Error).message },
      { status: 500 }
    );
  }
}
