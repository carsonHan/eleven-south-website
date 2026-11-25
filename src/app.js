const masterListing = {
  barfoot: 'https://www.barfoot.co.nz/property/residential/waitakere-city/henderson/townhouse/943775',
  tradeMe: 'https://www.trademe.co.nz/a/property/new-homes/new-townhouse-terraced/auckland/waitakere-city/henderson/listing/6213038514'
};

const units = {
  2: { beds: '3 bedrooms', bath: '2 bathrooms', parking: 'Garage with power available', note: 'Virtually staged interior imagery is available.', priority: 'Under contract' },
  4: { beds: '3 bedrooms', bath: 'Bathroom + separate toilet*', parking: 'Dedicated car park', note: 'Pre-installed EV cabling for future charging.', priority: 'Available now' },
  5: { beds: '2 bedrooms + study', bath: 'Bathroom', parking: 'Dedicated car park', note: 'Professionally staged interior imagery is available.', priority: 'Available now' },
  6: { beds: '2 bedrooms', bath: 'Bathroom', parking: 'Dedicated car park', note: 'Pre-installed EV cabling for future charging.', priority: 'Available now' }
};

function track(name, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...data });
  if (typeof window.gtag === 'function') window.gtag('event', name, data);
  if (typeof window.fbq === 'function') window.fbq('trackCustom', name, data);
}

function listing(unit, provider) {
  const url = window.ELEVEN_SOUTH_LISTINGS?.[unit]?.[provider] || masterListing[provider];
  track('listing_click', { unit: String(unit), provider, fallback: !window.ELEVEN_SOUTH_LISTINGS?.[unit]?.[provider] });
  window.open(url, '_blank', 'noopener,noreferrer');
}

const cardContent = {
  2: { status: 'Under contract', headline: 'More space for the way you live.', features: 'Large balcony · Dedicated laundry cabinet', url: 'https://www.barfoot.co.nz/property/residential/waitakere-city/henderson/townhouse/943776', specs: [['bed', '3 Bedrooms'], ['sofa', 'Family Room'], ['bath', '2 Bathrooms'], ['toilet', 'Toilet'], ['car', '1 Garage'], ['ruler', '129.9 m² approx.']] },
  4: { status: 'Available now', headline: 'Room to grow. Space to enjoy.', features: 'Pantry storage · Basement storage · EV-ready cabling', url: 'https://www.barfoot.co.nz/property/residential/waitakere-city/henderson/townhouse/943777', specs: [['bed', '3 Bedrooms'], ['bath', '1 Bathroom'], ['toilet', 'Toilet'], ['car', '1 Carpark'], ['ruler', '81.6 m² approx.']] },
  5: { status: 'Available now', headline: "A little extra room for life's possibilities.", features: 'Pantry storage · Basement storage · EV-ready cabling', url: 'https://www.barfoot.co.nz/property/residential/waitakere-city/henderson/townhouse/943778', specs: [['bed', '2 Bedrooms'], ['study', '1 Study'], ['bath', '1 Bathroom'], ['toilet', 'Toilet'], ['car', '1 Carpark'], ['ruler', '79.8 m² approx.']] },
  6: { status: 'Available now', headline: 'Your first step into a brand-new home.', features: 'Basement storage · EV-ready cabling', url: 'https://www.barfoot.co.nz/property/residential/waitakere-city/henderson/townhouse/943780', specs: [['bed', '2 Bedrooms'], ['bath', '1 Bathroom'], ['toilet', 'Toilet'], ['car', '1 Carpark'], ['ruler', '71.2 m² approx.']] }
};

function specIcon(type) {
  const icons = {
    bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18v-7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7M3 15h18M6 18v3M18 18v3M6 12V9M10 12V9"/></svg>',
    sofa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18v-5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5M3 18h18M5 18v3M19 18v3M7 10V7h10v3"/></svg>',
    study: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M6 20v-9h9v9M9 11V7h7v7M13 20v-5h5v5"/></svg>',
    bath: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14h18v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2ZM6 14V9a3 3 0 0 1 3-3h1M4 20v1M20 20v1"/></svg>',
    car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 11 2-5h10l2 5M3 11h18v7H3zM7 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17 18a1 1 0 1 0 0-2 1 1 0 1 0 0 2Z"/></svg>',
    ruler: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16 12-12 4 4-12 12-4-4ZM12 8l4 4M9 11l2 2M6 14l2 2"/></svg>',
    toilet: '<svg class="toilet-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="2.5" width="7" height="10" rx="1.3"/><path d="M10 10.5H20V13.5C20 17.2 17.3 19 13.5 19H11C8.8 19 7.5 17.3 7.5 15V12.5"/><path d="M11 19V21.5H19V19"/><path d="M4.8 5.3H7.2"/><path d="M10 12.2H20"/></svg>'
  };
  return icons[type];
}

function unitCard(unit) {
  const card = cardContent[unit];
  const photoAlt = { 2: 'Unit 2 open-plan kitchen and dining area', 4: 'Unit 4 exterior', 5: 'Unit 5 living and dining area', 6: 'Unit 6 kitchen, dining and living area' }[unit];
  return `<article class="residence ${unit === 2 ? 'under-contract' : 'available'}">
    <div class="residence-image image-placeholder image-${unit}${photoAlt ? ' has-photo' : ''}">${photoAlt ? `<img src="/unit-${unit}.jpg" alt="${photoAlt}">` : '<span>Image placeholder · completed development photography</span>'}<b>Unit ${unit}</b></div>
    <div class="residence-copy"><div class="residence-card-topline"><span class="status-badge">${card.status}</span><span class="residence-label">Residence ${unit}</span></div><h3>${card.headline}</h3><div class="property-specs">${card.specs.map(([type, label]) => `<span class="property-spec">${specIcon(type)}<span>${label}</span></span>`).join('')}</div><p class="property-features">${card.features}</p><a href="${card.url}" class="text-link" target="_blank" rel="noopener noreferrer">${unit === 2 ? 'View property listing' : 'View property details'} <span>↗</span></a></div>
  </article>`;
}

function mobileActions(unit = 'development') {
  if (unit === 'development') return `<aside class="mobile-action-bar single" aria-label="Quick actions"><a href="#residences">Explore available homes <span>→</span></a></aside>`;
  const listingLabel = unit === 'development' ? 'View on Trade Me' : 'Development listing';
  return `<aside class="mobile-action-bar" aria-label="Quick actions"><button class="mobile-listing listing" data-unit="${unit}" data-provider="tradeMe">${listingLabel}</button><button class="mobile-viewing open-enquiry" data-unit="${unit === 'development' ? '' : unit}">Arrange viewing</button></aside>`;
}

function unitPage(unit) {
  const u = units[unit];
  return `<main class="unit-page"><a class="back" href="/">← Eleven South</a><section class="unit-hero"><div><p class="eyebrow">${u.priority}</p><h1>Residence<br>${unit}</h1><p class="lede">A considered new home at Eleven South, Henderson.</p><button class="button dark open-enquiry" data-unit="${unit}">Arrange a viewing</button></div><div class="image-placeholder unit-large image-${unit}"><span>Photography placeholder</span></div></section><section class="unit-details"><div><p class="eyebrow">At a glance</p><h2>Comfort, composed.</h2></div><div class="facts"><div><small>Bedrooms</small><strong>${u.beds}</strong></div><div><small>Bathrooms</small><strong>${u.bath}</strong></div><div><small>Parking</small><strong>${u.parking}</strong></div><div><small>Provision</small><strong>${u.note}</strong></div></div></section><section class="listing-panel"><p class="eyebrow">Make an enquiry</p><h2>See it in person.</h2><p>Book a private viewing, or inspect the current listing details.</p><div class="actions"><button class="button dark open-enquiry" data-unit="${unit}">Arrange a viewing</button><button class="button outline listing" data-unit="${unit}" data-provider="tradeMe">View development listing on Trade Me</button></div><p class="fineprint">Listing links currently use the master development listing until individual listing URLs are supplied.</p></section>${unit === 4 ? '<p class="verification">* Bathroom configuration is marked for final verification before publication. Images of matching spaces may be indicative only.</p>' : ''}</main>${mobileActions(unit)}`;
}

function render() {
  const match = location.pathname.match(/^\/unit-(2|4|5|6)\/?$/);
  if (match) { document.querySelector('#app').innerHTML = unitPage(Number(match[1])); return; }
  document.querySelector('#app').innerHTML = `<main>
  <section class="hero"><video class="hero-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true" poster="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80"><source src="/hero-reel.mp4" type="video/mp4"></video><nav><a class="wordmark" href="/" aria-label="Eleven South home"><img src="/eleven-south-logo.png" alt="Eleven South"></a><button class="menu" aria-label="Open navigation" aria-expanded="false">Menu</button><div class="nav-links"><a href="#residences">Residences</a><a href="#story">The development</a><a class="nav-enquiry" href="#residences">Explore homes</a></div></nav><div class="hero-content"><p class="eyebrow">Henderson, Auckland · Completed homes</p><h1>A fresh start.<br>Your place to call home.</h1><p class="lede">Discover brand-new 2- and 3-bedroom townhouses in Henderson, with dedicated parking and thoughtfully designed living spaces.</p><div class="actions"><a href="#residences" class="button light">Explore Available Homes <span>→</span></a></div></div></section>
  <section id="residences" class="residences section"><div class="section-heading"><div class="sales-overview"><button class="sales-aerial-trigger" type="button" data-open-aerial aria-label="View the full aerial sales image"><img class="sales-aerial" src="/sales-aerial.jpg" alt="Annotated aerial view of Units 2, 4, 5 and 6 at Eleven South"></button><p class="eyebrow">Now selling</p><p>Discover our completed two-bedroom townhouses, thoughtfully designed for modern living in Henderson. Explore the available homes below and find the space that feels right for you.</p></div><div class="sales-heading"><h2>A home for<br>the next chapter.</h2></div></div><div class="residence-grid">${[6,5,4,2].map(unitCard).join('')}</div></section>
  <section id="story" class="story"><div class="story-image story-video-panel"><video class="story-video" controls playsinline preload="metadata" controlslist="nofullscreen nodownload" poster="/development-video-poster.jpg"><source src="/development-tour.mp4" type="video/mp4">Your browser does not support video playback.</video></div><div class="story-copy"><p class="eyebrow">Eleven South</p><h2>Designed for the way you live.</h2><p>Modern living, without the unnecessary complexity. Enjoy light-filled interiors, thoughtfully designed layouts, practical storage and dedicated parking — all in a brand-new home that's easy to make your own.</p><p>Whether you're buying your first home or looking for a little more room to grow, discover a home that fits your lifestyle today and tomorrow.</p><a href="https://www.trademe.co.nz/a/property/new-homes/new-townhouse-terraced/auckland/waitakere-city/henderson/listing/6213038514" class="text-link" target="_blank" rel="noopener noreferrer">Contact sales team <span>↗</span></a></div></section>
  <section class="quality section"><div><p class="eyebrow">Designed to last</p><h2>The details<br>matter.</h2></div><div class="quality-list"><div><span>01</span><h3>Completed homes</h3><p>No construction wait. No buying off the plans. Step inside and experience your brand-new home before making your decision.</p></div><div><span>02</span><h3>Future-ready parking</h3><p>Dedicated parking with pre-installed EV cabling in Units 4, 5 and 6, making future charger installation easier.</p></div><div><span>03</span><h3>Room for more</h3><p>Additional basement storage in Units 4, 5 and 6 keeps everyday belongings organised, leaving more space for living.</p></div><div><span>04</span><h3>Peace of mind</h3><p>Buy with confidence knowing your new home comes with a 10-Year Master Build Guarantee, transferable upon purchase in accordance with the guarantee terms.</p></div></div></section>
  <section id="neighbourhood" class="neighbourhood"><div class="neighbourhood-map"><button class="neighbourhood-aerial-trigger" type="button" data-open-neighbourhood-aerial aria-label="View the full neighbourhood aerial image"><img src="/neighbourhood-aerial.jpg" alt="Annotated aerial view showing Eleven South and nearby Henderson amenities"></button></div><div><p class="eyebrow">Neighbourhood</p><h2>Well connected,<br>well placed.</h2><p>Morning commutes, weekend shopping and everyday essentials — all within easy reach.</p><p>Perfectly positioned in Henderson, Eleven South brings you close to WestCity Waitakere, The Boundary Shopping Centre and Henderson Train Station, with local schools, dining and recreational facilities nearby.</p><p>Spend less time getting there and more time enjoying what matters.</p></div></section>
  <section id="enquire" class="enquire"><h2>Find your place<br>at Eleven South.</h2><div class="viewing-intro"><strong>Don’t be shy. Your private viewing awaits.</strong><p>Tell us when suits you, and we’ll be in touch to arrange the details.</p></div><form id="viewing-form" class="viewing-form"><label>Full name<input name="name" autocomplete="name" placeholder="Your full name" required maxlength="100"></label><label>Phone number<input name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="e.g. 021 123 4567" aria-describedby="phone-hint" required maxlength="40"><span id="phone-hint" class="field-hint">Include at least 7 digits; spaces and + are fine.</span></label><label>Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com" aria-describedby="email-hint" required maxlength="254"><span id="email-hint" class="field-hint">Enter a valid email address, such as you@example.com.</span></label><label>Preferred viewing time<textarea name="message" placeholder="When would you like to book?" required maxlength="2000" rows="4"></textarea></label><div id="viewing-captcha"></div><button class="button light" type="submit" disabled>Request a private viewing <span aria-hidden="true">↗</span></button><p class="form-hint">Complete all fields to continue.</p><p id="viewing-status" role="status" aria-live="polite"></p></form></section>
  <footer><a class="wordmark" href="/" aria-label="Eleven South home"><img src="/eleven-south-logo.png" alt="Eleven South"></a><div><p>11 South Pacific Place<br>Henderson, Auckland</p></div><p>© ${new Date().getFullYear()} Eleven South</p></footer></main>${mobileActions()}<dialog id="aerial-dialog" class="image-dialog"><button id="close-aerial-dialog" class="close" type="button" aria-label="Close aerial image">×</button><img src="/sales-aerial.jpg" alt="Full annotated aerial view of Units 2, 4, 5 and 6 at Eleven South"></dialog><dialog id="neighbourhood-aerial-dialog" class="image-dialog"><button id="close-neighbourhood-aerial-dialog" class="close" type="button" aria-label="Close neighbourhood aerial image">×</button><img src="/neighbourhood-aerial.jpg" alt="Full annotated aerial view showing Eleven South and nearby Henderson amenities"></dialog>`;
}

function openEnquiry(unit = '') { document.querySelector('#unit').value = unit || ''; document.querySelector('#enquiry').showModal(); track('enquiry_opened', { unit: String(unit || 'development') }); }
render();
const viewingForm = document.querySelector('#viewing-form');
if (viewingForm) {
  const status = document.querySelector('#viewing-status');
  let widget;
  const submit = viewingForm.querySelector('button');
  let ready = false;
  let sending = false;
  const name = viewingForm.elements.name;
  const phone = viewingForm.elements.phone;
  const email = viewingForm.elements.email;
  const message = viewingForm.elements.message;
  function updateValidity() {
    const phoneValid = /^[+\d\s().-]+$/.test(phone.value.trim()) && (phone.value.match(/\d/g) || []).length >= 7;
    email.setCustomValidity('');
    const emailValid = email.validity.valid && /^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(email.value.trim());
    phone.setCustomValidity(phoneValid || !phone.value ? '' : 'Enter a phone number with at least 7 digits.');
    email.setCustomValidity(emailValid || !email.value ? '' : 'Enter a valid email address, such as you@example.com.');
    submit.disabled = !ready || sending || !name.value.trim() || !phoneValid || !emailValid || !message.value.trim();
  }
  viewingForm.addEventListener('input', updateValidity);
  fetch('/api/viewing-config').then(response => { if (!response.ok) throw new Error(); return response.json(); }).then(config => {
    if (!config.siteKey || !window.turnstile) throw new Error();
    widget = window.turnstile.render('#viewing-captcha', { sitekey: config.siteKey });
    ready = true; updateValidity();
  }).catch(() => { status.textContent = 'The enquiry form is temporarily unavailable. Please try again later.'; viewingForm.querySelector('button').disabled = true; });
  viewingForm.addEventListener('submit', async event => {
    event.preventDefault();
    const button = viewingForm.querySelector('button');
    const data = new FormData(viewingForm);
    if (!data.get('cf-turnstile-response')) { status.textContent = 'Please complete the CAPTCHA before sending.'; return; }
    sending = true; updateValidity(); status.textContent = 'Sending your request…';
    try {
      const response = await fetch('/api/viewing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(data)) });
      if (!response.ok) throw new Error();
      viewingForm.reset(); status.textContent = 'Your request has been sent. We’ll be in touch to arrange your viewing.';
    } catch { status.textContent = 'Your request was not sent. Please try again.'; }
    finally { if (widget !== undefined) window.turnstile.reset(widget); sending = false; updateValidity(); }
  });
}
document.querySelector('.menu')?.addEventListener('click', (event) => {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
  const expanded = links.classList.contains('open');
  event.currentTarget.textContent = expanded ? 'Close' : 'Menu';
  event.currentTarget.setAttribute('aria-expanded', String(expanded));
});
document.addEventListener('click', (event) => { const open = event.target.closest('.open-enquiry'); if (open) openEnquiry(open.dataset.unit); const link = event.target.closest('.listing'); if (link) listing(link.dataset.unit, link.dataset.provider); const aerial = event.target.closest('[data-open-aerial]'); if (aerial) document.querySelector('#aerial-dialog')?.showModal(); const neighbourhoodAerial = event.target.closest('[data-open-neighbourhood-aerial]'); if (neighbourhoodAerial) document.querySelector('#neighbourhood-aerial-dialog')?.showModal(); });
document.querySelector('#enquiry-form').addEventListener('submit', (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); if (!form.get('consent')) return; track('enquiry_config_pending', { unit: form.get('unit') || 'development' }); document.querySelector('#form-status').hidden = false; });
document.querySelector('#close-dialog').addEventListener('click', () => document.querySelector('#enquiry').close());
document.querySelector('#close-aerial-dialog')?.addEventListener('click', () => document.querySelector('#aerial-dialog')?.close());
document.querySelector('#close-neighbourhood-aerial-dialog')?.addEventListener('click', () => document.querySelector('#neighbourhood-aerial-dialog')?.close());
