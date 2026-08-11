export async function POST(req) {
  const { messages } = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant inside AI Studio, a mobile app. Be clear and concise.' },
        ...messages,
      ],
    }),
  });

  const data = await response.json();

  if (data.error) {
    return Response.json({ reply: `Error: ${data.error.message}` });
  }

  const reply = data.choices?.[0]?.message?.content || 'No response.';
  return Response.json({ reply });
}
