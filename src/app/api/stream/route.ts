import { NextRequest, NextResponse } from 'next/server';

// Ensure this route runs on Node runtime for proper streaming
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, headers = {}, body: requestBody } = body;

    // Validate URL is from our API base
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    if (!url.startsWith(apiBaseUrl)) {
      return NextResponse.json(
        { error: 'Invalid URL: must be from API base URL' },
        { status: 400 }
      );
    }

    // Prepare headers for the backend request
    const backendHeaders: Record<string, string> = {
      'Accept': 'text/event-stream',
      'Cache-Control': 'no-cache',
      ...headers,
    };

    // Forward authorization header if present
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      backendHeaders['Authorization'] = authHeader;
    }

    // Make the request to the backend
    const backendResponse = await fetch(url, {
      method: 'POST',
      headers: backendHeaders,
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: `Backend request failed: ${backendResponse.status}` },
        { status: backendResponse.status }
      );
    }

    // Create a readable stream to pipe the backend response
    const stream = new ReadableStream({
      start(controller) {
        const reader = backendResponse.body?.getReader();
        
        if (!reader) {
          controller.close();
          return;
        }

        function pump(): Promise<void> {
          if (!reader) {
            controller.close();
            return Promise.resolve();
          }
          
          return reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            return pump();
          });
        }

        return pump().catch((error) => {
          console.error('Stream error:', error);
          controller.error(error);
        });
      },
    });

    // Return the stream with appropriate headers for SSE
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('Stream proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
