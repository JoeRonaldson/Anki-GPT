// API Endpoint for the Chat process

import axios from 'axios';

export async function GET(request: Request) {
  return new Response('This is the Chat API Route');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };
    const response = await axios.post(url, body, { headers: headers });

    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error', {
      status: 500,
    });
  }
}
