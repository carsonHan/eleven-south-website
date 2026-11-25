// Deploy separately as a Cloudflare Worker on the site's /api/* route.
const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/viewing-config' && request.method === 'GET') {
      if (!env.TURNSTILE_SITE_KEY || !env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.MAIL_FROM || !env.SITE_HOSTNAME) return json({ error: 'Unavailable' }, 503);
      return json({ siteKey: env.TURNSTILE_SITE_KEY });
    }
    if (url.pathname !== '/api/viewing' || request.method !== 'POST') return json({ error: 'Not found' }, 404);
    if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.MAIL_FROM || !env.SITE_HOSTNAME) return json({ error: 'Unavailable' }, 503);
    if (request.headers.get('Origin') !== `https://${env.SITE_HOSTNAME}`) return json({ error: 'Invalid origin' }, 403);
    if (Number(request.headers.get('Content-Length') || 0) > 8192) return json({ error: 'Too large' }, 413);
    let body;
    try { const raw = await request.text(); if (raw.length > 8192) return json({ error: 'Too large' }, 413); body = JSON.parse(raw); } catch { return json({ error: 'Invalid request' }, 400); }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Invalid request' }, 400);
    const field = (key, max) => typeof body[key] === 'string' && body[key].trim().length > 0 && body[key].trim().length <= max;
    if (!field('name', 100) || !field('phone', 40) || !field('email', 254) || !field('message', 2000) || !field('cf-turnstile-response', 2048) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim()) || /[\r\n]/.test(body.email)) return json({ error: 'Invalid fields' }, 400);
    try {
      const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: body['cf-turnstile-response'], remoteip: request.headers.get('CF-Connecting-IP') }) });
      const result = await verification.json();
      if (!verification.ok || !result.success || result.hostname !== env.SITE_HOSTNAME) return json({ error: 'Verification failed' }, 400);
      const mail = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: env.MAIL_FROM, to: ['atrea1991@gmail.com'], reply_to: body.email.trim(), subject: 'Eleven South private viewing request', text: `Name: ${body.name.trim()}\nPhone: ${body.phone.trim()}\nEmail: ${body.email.trim()}\n\nPreferred viewing time:\n${body.message.trim()}` }) });
      if (!mail.ok) return json({ error: 'Delivery failed' }, 502);
      return json({ ok: true });
    } catch { return json({ error: 'Service unavailable' }, 502); }
  }
};
