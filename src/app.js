const masterListing = {
  barfoot: 'https://www.barfoot.co.nz/property/residential/waitakere-city/henderson/townhouse/943775',
  tradeMe: 'https://www.trademe.co.nz/a/property/new-homes/new-townhouse-terraced/auckland/waitakere-city/henderson/listing/6213038514'
};

const units = {
  2: { beds: '3 bedrooms', bath: '2 bathrooms', parking: 'Garage with power available', note: 'Virtually staged interior imagery is available.', priority: 'Featured residence' },
  4: { beds: '3 bedrooms', bath: 'Bathroom + separate toilet*', parking: 'Dedicated car park', note: 'Pre-installed EV cabling for future charging.', priority: 'Featured residence' },
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

function unitCard(unit) {
  const u = units[unit];
  const photoAlt = { 2: 'Unit 2 open-plan kitchen and dining area', 4: 'Unit 4 exterior', 5: 'Unit 5 living and dining area', 6: 'Unit 6 kitchen, dining and living area' }[unit];
  const cardDetails = { 2: '3 Bedrooms · 2 Bathrooms + Separate Toilet · Family Room<br>Dedicated Laundry Cabinet · Large Balcony · Garage for Parking', 4: '3 Bedrooms · Bathroom + Separate Toilet<br>Dedicated car park · Laundry Cabinet · Pantry Storage · Basement Storage', 5: '2 Bedrooms + Study · Bathroom + Separate Toilet<br>Dedicated car park · Laundry Cabinet · Pantry Storage · Basement Storage', 6: '2 Bedrooms · Bathroom + Separate Toilet<br>Dedicated car park · Laundry Cupboard · Basement Storage' }[unit] || `${u.beds} · ${u.bath}<br>${u.parking}`;
  return `<article class="residence ${unit === 2 || unit === 4 ? 'priority' : ''}">
    <div class="residence-image image-placeholder image-${unit}${photoAlt ? ' has-photo' : ''}">${photoAlt ? `<img src="/unit-${unit}.jpg" alt="${photoAlt}">` : '<span>Image placeholder · completed development photography</span>'}<b>Unit ${unit}</b></div>
    <div class="residence-copy"><p class="eyebrow">${u.priority}</p><h3>Residence ${unit}</h3><p>${cardDetails}</p><a href="/unit-${unit}/" class="text-link" data-unit="${unit}">Explore residence <span>→</span></a></div>
  </article>`;
}

function mobileActions(unit = 'development') {
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
  <section class="hero"><video class="hero-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true" poster="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80"><source src="/hero-reel.mp4" type="video/mp4"></video><nav><a class="wordmark" href="/" aria-label="Eleven South home"><img src="/eleven-south-logo.png" alt="Eleven South"></a><button class="menu" aria-label="Open navigation" aria-expanded="false">Menu</button><div class="nav-links"><a href="#residences">Residences</a><a href="#story">The development</a><button class="nav-enquiry open-enquiry">Enquire</button></div></nav><div class="hero-content"><p class="eyebrow">Henderson, Auckland · Now complete</p><h1>A new place<br>to call home.</h1><p class="lede">Brand-new two- and three-bedroom townhouses at 11 South Pacific Place.</p><div class="actions"><a href="#residences" class="button light">Explore available homes</a><button class="hero-link open-enquiry">Arrange a viewing <span>↓</span></button></div></div></section>
  <section id="residences" class="residences section"><div class="section-heading"><div class="sales-overview"><img class="sales-aerial" src="/sales-aerial.jpg" alt="Annotated aerial view of Units 2, 4, 5 and 6 at Eleven South"><p class="eyebrow">Now selling</p><p>Four completed residences are currently available. Begin with our featured three-bedroom homes.</p></div><div class="sales-heading"><h2>A home for<br>the next chapter.</h2></div></div><div class="residence-grid">${[2,4,5,6].map(unitCard).join('')}</div></section>
  <section id="story" class="story"><div class="story-image story-video-panel"><video class="story-video" controls playsinline preload="metadata" controlslist="nofullscreen nodownload" poster="/development-video-poster.jpg"><source src="/development-tour.mp4" type="video/mp4">Your browser does not support video playback.</video></div><div class="story-copy"><p class="eyebrow">Eleven South</p><h2>Made for everyday ease.</h2><p>Behind a restrained architectural form, each home is designed for practical living: calm spaces, thoughtful storage and a simple connection to the neighbourhood beyond.</p><p>Every marketed residence is intended to be covered by a 10-Year Master Build Guarantee, subject to confirmation of the guarantee documents and transfer terms.</p><a href="#enquire" class="text-link open-enquiry">Talk to us about a residence <span>→</span></a></div></section>
  <section class="quality section"><div><p class="eyebrow">Designed to last</p><h2>The details<br>matter.</h2></div><div class="quality-list"><div><span>01</span><h3>Completed homes</h3><p>Inspect the finished development and make a decision with confidence.</p></div><div><span>02</span><h3>Future-ready parking</h3><p>Units 4, 5 and 6 include pre-installed EV cabling for future charging equipment.</p></div><div><span>03</span><h3>Built reassurance</h3><p>Guarantee availability and transfer terms will be confirmed with the sale documentation.</p></div></div></section>
  <section id="neighbourhood" class="neighbourhood"><div class="neighbourhood-map"><img src="/neighbourhood-aerial.jpg" alt="Annotated aerial view showing Eleven South and nearby Henderson amenities"></div><div><p class="eyebrow">Neighbourhood</p><h2>Well connected,<br>well placed.</h2><p>Eleven South sits in Henderson, West Auckland. Explore the local amenity, shopping and transport options as part of your viewing visit.</p><p class="fineprint">Neighbourhood distances and travel times will be added after location claims are verified.</p></div></section>
  <section id="enquire" class="enquire"><p class="eyebrow">Private viewings</p><h2>Find your place<br>at Eleven South.</h2><button class="button light open-enquiry">Arrange a viewing</button><button class="hero-link light-link listing" data-unit="development" data-provider="tradeMe">View development listing <span>↗</span></button></section>
  <footer><a class="wordmark" href="/" aria-label="Eleven South home"><img src="/eleven-south-logo.png" alt="Eleven South"></a><div><p>11 South Pacific Place<br>Henderson, Auckland</p><p><a href="#privacy">Privacy</a> · Listing information subject to confirmation.</p></div><p>© ${new Date().getFullYear()} Eleven South</p></footer></main>${mobileActions()}`;
}

function openEnquiry(unit = '') { document.querySelector('#unit').value = unit || ''; document.querySelector('#enquiry').showModal(); track('enquiry_opened', { unit: String(unit || 'development') }); }
render();
document.querySelector('.menu')?.addEventListener('click', (event) => {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
  const expanded = links.classList.contains('open');
  event.currentTarget.textContent = expanded ? 'Close' : 'Menu';
  event.currentTarget.setAttribute('aria-expanded', String(expanded));
});
document.addEventListener('click', (event) => { const open = event.target.closest('.open-enquiry'); if (open) openEnquiry(open.dataset.unit); const link = event.target.closest('.listing'); if (link) listing(link.dataset.unit, link.dataset.provider); });
document.querySelector('#enquiry-form').addEventListener('submit', (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); if (!form.get('consent')) return; track('enquiry_config_pending', { unit: form.get('unit') || 'development' }); document.querySelector('#form-status').hidden = false; });
document.querySelector('#close-dialog').addEventListener('click', () => document.querySelector('#enquiry').close());
