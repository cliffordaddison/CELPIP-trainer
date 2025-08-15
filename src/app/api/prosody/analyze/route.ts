import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!audioFile.type.startsWith('audio/')) {
      return NextResponse.json(
        { error: 'File must be an audio file' },
        { status: 400 }
      );
    }

    // Create new FormData for the micro-service
    const serviceFormData = new FormData();
    serviceFormData.append('audio_file', audioFile);

    // Call the prosody micro-service
    const prosodyUrl = process.env.PROSODY_SERVICE_URL || 'http://localhost:8001';
    const response = await fetch(`${prosodyUrl}/prosody/analyze`, {
      method: 'POST',
      body: serviceFormData,
    });

    if (!response.ok) {
      throw new Error(`Prosody service error: ${response.statusText}`);
    }

    const analysis = await response.json();

    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Prosody analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Analysis failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Prosody analysis endpoint',
    method: 'POST',
    required: 'audio file (multipart/form-data)',
  });
}
