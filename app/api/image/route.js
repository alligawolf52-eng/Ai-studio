export async function POST(req) {
  const { prompt, size } = await req.json();

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: size || '1024x1024',
    }),
  });

  const data = await response.json();

  if (data.error) {
    return Response.json({ error: data.error.message });
  }

  const url = data.data?.[0]?.url;
  return Response.json({ url });
}
