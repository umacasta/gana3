export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const accessToken = process.env.META_ACCESS_TOKEN;
  const pixelId = '1196008671864934';

  const body = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: req.headers.referer || 'https://linkdecontacto.vercel.app',
    action_source: 'website',
    user_data: {
      client_ip_address: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
      client_user_agent: req.headers['user-agent'],
    }
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [body] })
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Error sending event to Meta' });
  }
}
