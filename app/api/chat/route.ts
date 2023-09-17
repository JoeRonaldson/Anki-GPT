// API Endpoint for the Chat process

export const runtime = 'edge'; // makes it an edge function which allows api timeout up to 30s

export async function GET(request: Request) {
  return new Response('This is the Chat API Route');
}

// Using Egde Function with longer timeout
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const responseData = await response.json();
      return new Response(JSON.stringify(responseData), {
        status: 200,
      });
    } else {
      return new Response('Error when connecting to OpenAI API', {
        status: response.status,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response('Error when connecting to OpenAI API', {
      status: 500,
    });
  }
}
