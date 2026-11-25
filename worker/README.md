# Private viewing setup (not deployed)

This static site needs a separate Cloudflare Worker on the same hostname for `/api/viewing*`. Deploy `viewing.js` to that Worker only after configuring and testing it. Keep the existing site route for all other paths. Do not expose or commit secrets.

1. Create a Cloudflare Turnstile widget for the actual site hostname. Set `TURNSTILE_SITE_KEY` and secret `TURNSTILE_SECRET_KEY` on the Worker.
2. Create a Resend account, verify a sending domain, and create a restricted API key. Set secret `RESEND_API_KEY` and `MAIL_FROM` to a verified sender, for example `Eleven South <viewings@example.com>`.
3. Set `SITE_HOSTNAME` to the exact public website hostname, without scheme or slash. The Worker checks both request origin and Turnstile's verified hostname. Emails go to the trial address in the Worker.
4. Configure Cloudflare rate limiting/WAF for POST `/api/viewing`, and test Turnstile, successful inbox delivery, invalid tokens, provider failures, and mobile layout on a private preview using its own hostname and widget. A provider acceptance response does not guarantee inbox delivery; verify receipt.
5. Only then deploy the Worker and site together. Set secrets using Cloudflare's dashboard or secret management, not source files or command arguments.
