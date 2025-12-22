import { NextResponse } from 'next/server';

const LANGSMITH_API_KEY = process.env.LANGSMITH_API_KEY;
const LANGSMITH_PROJECT = 'fulcrum';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function POST(request: Request) {
  const runId = generateUUID();

  try {
    const event = await request.json();

    // Create LangSmith run
    const run = {
      id: runId,
      name: event.command || event.name || 'fulcrum_event',
      run_type: 'tool',
      inputs: event.inputs || {},
      outputs: event.outputs || {},
      start_time: event.start_time || new Date().toISOString(),
      end_time: event.end_time || new Date().toISOString(),
      project_name: LANGSMITH_PROJECT,
      metadata: {
        user_id: event.user_id,
        version: event.version || '1.0.0',
        ...event.metadata,
      },
      tags: event.tags || ['fulcrum'],
    };

    // Forward to LangSmith (non-blocking - always return success)
    if (LANGSMITH_API_KEY) {
      try {
        const response = await fetch('https://api.smith.langchain.com/runs', {
          method: 'POST',
          headers: {
            'x-api-key': LANGSMITH_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(run),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('LangSmith error:', response.status, errorText);
          // Don't fail the request - just log the error
        }
      } catch (langsmithError) {
        console.error('LangSmith request failed:', langsmithError);
        // Don't fail the request - just log the error
      }
    } else {
      console.warn('LANGSMITH_API_KEY not configured');
    }

    // Always return success to the client
    return NextResponse.json({ ok: true, run_id: runId });
  } catch (error) {
    console.error('Telemetry error:', error);
    // Even on error, return success so we don't break the client
    return NextResponse.json({ ok: true, run_id: runId, logged: false });
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    project: LANGSMITH_PROJECT,
    configured: !!LANGSMITH_API_KEY,
  });
}
