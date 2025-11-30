const fetch = require('node-fetch');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  // Turnstile token sent from form
  const token = body['cf-turnstile-response'];

  // Secret key from environment variable
  const secret = process.env.TURNSTILE_SECRET;

  // Verify token with Cloudflare
  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`
  });

  const data = await resp.json();

  if (data.success) {
    // Verification passed, proceed with form handling
    return { statusCode: 200, body: JSON.stringify({ message: 'Verified' }) };
  } else {
    return { statusCode: 400, body: JSON.stringify({ message: 'Verification failed' }) };
  }
};
