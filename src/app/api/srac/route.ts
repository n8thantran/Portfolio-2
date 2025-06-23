import { NextResponse } from 'next/server';

interface LocationData {
  LocationId: number;
  LocationName: string;
  TotalCapacity: number;
  CountOfParticipants: number;
  PercetageCapacity: number;
  LastUpdatedDateAndTime: string;
  LastCount: number;
  MinColor: string;
  MidColor: string | null;
  MaxColor: string;
  MinCapacityRange: number;
  MaxCapacityRange: number;
  CountCapacityColorEnabled: boolean;
  FacilityId: number;
  FacilityName: string;
  IsClosed: boolean;
}

export async function GET() {
  try {
    const response = await fetch(
      'https://goboardapi.azurewebsites.net/api/FacilityCount/GetCountsByAccount?AccountAPIKey=92833ff9-2797-43ed-98ab-8730784a147f',
      {
        headers: {
          'Accept': 'application/json',
        },
        // Add cache control to get fresh data
        next: { revalidate: 60 } // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LocationData[] = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching SRAC data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SRAC data' },
      { status: 500 }
    );
  }
} 