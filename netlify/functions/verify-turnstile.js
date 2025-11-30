exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Turnstile token sent from form
    const token = body['cf-turnstile-response'];

    // Secret key from environment variable
    const secret = process.env.TURNSTILE_SECRET;

    if (!token || !secret) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing Turnstile token or secret.' })
      };
    }

    // Verify token with Cloudflare
    const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`
    });

    const data = await resp.json();

    if (data.success) {
      return { statusCode: 200, body: JSON.stringify({ message: 'Verified' }) };
    } else {
      return { statusCode: 400, body: JSON.stringify({ message: 'Verification failed' }) };
    }
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error during Turnstile verification.' })
    };
  }
};
