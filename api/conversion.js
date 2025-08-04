// /api/conversions.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch('https://graph.facebook.com/v18.0/747470498138166/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...req.body,
        access_token: 'EAAGmUJu5ZC8sBAOjXZA7OCTZAXZCZBZBGvvvRKEMnZA8dCtcPHZBDZC8Jdaz5vmhPH3ihGZC2HghN4ZA6cZCbVoIJvWwJbkUj9mnkKNyK1l6H7D9EK6HdYRYtE7Y8j3wHcwhT3gAfzGhKak68uK1ZBsyZAZAZAFNiGGHJNVZCuNRRWWUTSCFZCZB8hJXT3Qkpq3At5XQoZB0AoZD'
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al enviar evento a Meta' });
  }
}
