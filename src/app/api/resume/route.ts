import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const resumeUrl = "https://github.com/n8thantran/resume/raw/SWE/main.pdf";

  try {
    const response = await fetch(resumeUrl, {
      next: { revalidate: 3600 }, // Cache the response for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`);
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="nathan-tran-resume.pdf"',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return new NextResponse(`Error fetching resume: ${error.message}`, { status: 500 });
    }
    console.error(error);
    return new NextResponse('Error fetching resume', { status: 500 });
  }
} 