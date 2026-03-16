export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Request body:', JSON.stringify(req.body));

    const payload = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: req.body.system,
      messages: req.body.messages,
    };

    console.log('Sending payload:', JSON.stringify(payload));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('Anthropic status:', response.status);
    console.log('Anthropic response:', JSON.stringify(data));
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
