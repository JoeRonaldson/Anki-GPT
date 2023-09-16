// API Endpoint for the Chat process

// import axios from 'axios';

export const runtime = 'edge';

export async function GET(request: Request) {
  return new Response('This is the Chat API Route');
}

// Code for Severless funciton
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const url = 'https://api.openai.com/v1/chat/completions';
//     const headers = {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     };
//     const response = await axios.post(url, body, { headers: headers });

//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//     });
//   } catch (error) {
//     console.log(error);
//     return new Response('Error when connecting to OpenAI API', {
//       status: 500,
//     });
//   }
// }

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
