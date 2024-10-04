import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/pharmacies/?reported`);
    if (!res.ok) {
      throw new Error('Failed to fetch pharmacies');
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
