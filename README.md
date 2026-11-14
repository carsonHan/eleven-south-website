# Eleven South

Static, mobile-first marketing site for Eleven South, 11 South Pacific Place, Henderson. It intentionally uses image placeholders until approved project photography and floor plans are supplied.

## Run locally

```bash
npm run build
npm run dev
```

The static output is written to `dist/`. Any static host (including Cloudflare Pages) can deploy that folder.

## Content and listing configuration

All unit content is held in `src/app.js`. The temporary master listing fallbacks are Barfoot & Thompson and Trade Me. To configure individual links before they are live, insert this before `app.js` in `src/index.html`:

```html
<script>
window.ELEVEN_SOUTH_LISTINGS = {
  2: { tradeMe: 'https://…', barfoot: 'https://…' },
  4: { tradeMe: 'https://…', barfoot: 'https://…' }
};
</script>
```

Do not publish a unit-specific URL until it is supplied by the listing agent.

## Enquiries and analytics

The current form validates data and consent in-browser, but deliberately **does not store or send personal information**. It displays a configuration-pending message. Connect it to a secure server-side endpoint (for example, a Cloudflare Worker using an email provider) before launch. That endpoint should validate input, rate-limit requests, protect against spam, apply the stated retention policy, and send only to approved agents.

`listing_click`, `enquiry_opened`, and `enquiry_config_pending` events are pushed to `dataLayer` and forwarded when `gtag` / `fbq` are configured. Load Meta Pixel and GA4 only after appropriate consent, and pass UTM parameters to the enquiry endpoint when it is connected.

## Cloudflare Pages

1. Create a Cloudflare Pages project from the authorised GitHub repository.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Configure the secure enquiry endpoint and analytics IDs as environment settings, not client secrets.
5. Deploy a preview. Do not attach `elevensouth.co.nz` until its owner approves.

## Still required before a public launch

- Approved exterior, interior, and floor-plan files (including image rights and accurate captions).
- Selling agent names, phone/email, privacy notice, and retention period.
- Unit 4 bathroom configuration and Master Build Guarantee documents/transfer terms.
- Per-unit Barfoot and Trade Me URLs.
- Confirmed Henderson amenity/transport statements.
