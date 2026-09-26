(() => {
  const T = {
    es: {
      issueA: 'Nº 00 ·', issueB: 'EN PREPARACIÓN', langGroup: 'Idioma',
      taglineA: 'BOLSOS DE DISEÑO FUNCIONAL', taglineB: '\u00a0· HECHO\u00a0EN\u00a0ESPAÑA',
      caption: 'PÖMPON <span class="redact" role="img" aria-label="nombre por desvelar"></span> — EN PREPARACIÓN', captionHover: 'Todavía no. Pronto.',
      modelAlt: 'Modelo con blazer negro sosteniendo el primer bolso de PÖMPON, oculto tras un mosaico.',
      mosaicAria: 'El primer bolso, todavía oculto',
      soon: 'PRÓXIMAMENTE', works: 'Diseño que funciona.', follow: 'Síguenos mientras tanto',
      kicker: 'EL PRIMER BOLSO', first: 'Un bolso que guarda algo que no esperas',
      subTitle: 'ALGO ESPECIAL ESTÁ EN CAMINO', subLede: 'Estamos preparando algo único para ti. Sé de las primeras en descubrirlo.', emailLabel: 'Tu email', emailPh: 'tu email',
      subBtn: 'UNIRME', sending: 'ENVIANDO…', errEmail: 'Revisa el email', errNet: 'No hemos podido enviarlo. Inténtalo de nuevo.',
      legal: 'Solo novedades de PÖMPON. Baja cuando quieras. <a href="legal/#privacidad">Privacidad</a>.',
      doneTitle: 'SUSCRITA.', doneText: 'Te contaremos lo que pase en el taller.',
      edition: 'Nº\u00a000\u00a0· PRIMERA\u00a0EDICIÓN',
      ticker: 'EN PREPARACIÓN · Nº 00 · PRÓXIMAMENTE · DISEÑO FUNCIONAL · HECHO EN ESPAÑA · @POMPON.BRAND',
      navSocial: 'Redes y contacto', navLegal: 'Legal', contact: 'Contacto', legalNotice: 'Aviso legal', privacy: 'Privacidad', legalLink: 'Legal',
      title: 'PÖMPON — Nº 00 · En preparación'
    },
    en: {
      issueA: 'ISSUE 00 ·', issueB: 'IN THE MAKING', langGroup: 'Language',
      taglineA: 'FUNCTIONAL DESIGNER BAGS', taglineB: '\u00a0· MADE\u00a0IN\u00a0SPAIN',
      caption: 'PÖMPON <span class="redact" role="img" aria-label="name to be revealed"></span> — IN THE MAKING', captionHover: 'Not yet. Soon.',
      modelAlt: 'Model in a black blazer holding the first PÖMPON bag, hidden behind a mosaic.',
      mosaicAria: 'The first bag, still hidden',
      soon: 'COMING SOON', works: 'Design that works.', follow: 'Follow us meanwhile',
      kicker: 'THE FIRST BAG', first: 'A bag that keeps something you don’t expect',
      subTitle: 'SOMETHING SPECIAL IS ON ITS WAY', subLede: 'We’re preparing something unique for you. Be among the first to discover it.', emailLabel: 'Your email', emailPh: 'your email',
      subBtn: 'JOIN', sending: 'SENDING…', errEmail: 'Check your email', errNet: 'We couldn’t send it. Please try again.',
      legal: 'Only PÖMPON news. Unsubscribe anytime. <a href="legal/#privacy">Privacy</a>.',
      doneTitle: 'SUBSCRIBED.', doneText: 'We’ll tell you what happens in the workshop.',
      edition: 'ISSUE\u00a000\u00a0· FIRST\u00a0EDITION',
      ticker: 'IN THE MAKING · ISSUE 00 · COMING SOON · FUNCTIONAL DESIGN · MADE IN SPAIN · @POMPON.BRAND',
      navSocial: 'Social and contact', navLegal: 'Legal', contact: 'Contact', legalNotice: 'Legal notice', privacy: 'Privacy', legalLink: 'Legal',
      title: 'PÖMPON — Issue 00 · In the making'
    }
  };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const q = new URLSearchParams(location.search);
  /* Sin almacenamiento en el dispositivo (ni cookies ni localStorage): la página se sirve sin banner de cookies. Spec §3. */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let lang = q.get('lang') || ((navigator.language || 'es').startsWith('es') ? 'es' : 'en');
  if (!T[lang]) lang = 'es';
  const t = k => T[lang][k];

  /* i18n */
  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l; document.title = t('title');
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    $$('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    $$('[data-i18n-alt]').forEach(el => { el.alt = t(el.dataset.i18nAlt); });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    setCaption();
    buildTicker();
    refreshForm();
  }

  /* ticker */
  const track = $('#ticker');
  function buildTicker() {
    track.textContent = '';
    const txt = t('ticker') + ' ·';
    const n = Math.max(2, Math.ceil((innerWidth * 1.2) / (txt.length * 9)));
    for (let h = 0; h < 2; h++) for (let i = 0; i < n; i++) {
      const s = document.createElement('span'); s.className = 'ticker__item'; s.textContent = txt; track.appendChild(s);
    }
  }

  /* mosaic */
  const mosaic = $('#mosaic'), caption = $('#caption');
  const PAL = ['black', 'umber', 'umber', 'taupe', 'taupe', 'taupe', 'taupe-lt', 'taupe-lt', 'sand', 'sand', 'sand-lt', 'gold', 'gold-dk'].map(n => `var(--c-mosaic-${n})`);
  const pick = () => PAL[Math.floor(Math.random() * PAL.length)];
  const tiles = [];
  for (let i = 0; i < 64; i++) { const s = document.createElement('span'); s.style.setProperty('--c', pick()); mosaic.appendChild(s); tiles.push(s); }
  function setCaption() {
    if (hovering) { caption.textContent = t('captionHover'); return; }
    caption.innerHTML = t('caption');
    const r = caption.querySelector('.redact'); if (!r) return;
    const cols = 18, rows = 4, tones = ['#0b0b0b', '#1d1b19', '#3a3733', '#5b5752', '#86817a', '#b3aea7', '#d6d2cb'];
    let s = '';
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const edge = y === 0 || y === rows - 1;
      const k = Math.min(tones.length - 1, Math.floor(Math.random() * 4) + (edge ? 3 : 0));
      s += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + tones[k] + '"/>';
    }
    r.style.backgroundImage = 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + cols + ' ' + rows + '" preserveAspectRatio="none" shape-rendering="crispEdges">' + s + '</svg>') + '")';
  }
  let hovering = false, drift = null, shuffleT = null, touchT = null;
  function startDrift() {
    clearInterval(drift); if (reduce.matches) return;
    drift = setInterval(() => { for (let k = 0; k < 3; k++) tiles[Math.floor(Math.random() * 64)].style.setProperty('--c', pick()); }, 650);
  }
  function shuffle() {
    const cols = tiles.map(s => s.style.getPropertyValue('--c'));
    for (let i = cols.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cols[i], cols[j]] = [cols[j], cols[i]]; }
    mosaic.classList.add('is-shuffling');
    tiles.forEach((s, i) => { s.style.setProperty('--d', (Math.random() * .3).toFixed(2) + 's'); s.style.setProperty('--c', cols[i]); });
    clearTimeout(shuffleT); shuffleT = setTimeout(() => mosaic.classList.remove('is-shuffling'), 900);
  }
  function setHover(on) {
    if (on === hovering) return; hovering = on;
    setCaption();
    if (on) shuffle();
  }
  mosaic.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') setHover(true); });
  mosaic.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') setHover(false); });
  mosaic.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') return;
    if (hovering) shuffle(); else setHover(true);
    clearTimeout(touchT); touchT = setTimeout(() => setHover(false), 2600);
  });
  mosaic.addEventListener('focus', () => setHover(true));
  mosaic.addEventListener('blur', () => setHover(false));
  reduce.addEventListener?.('change', startDrift);
  startDrift();

  /* Klaviyo — lista propia "Coming Soon" (VKFykc), separada de la waitlist UUiYvp.
     Public key y list id son públicos por diseño (client API). Spec: EC_landing-coming-soon.md §3.
     Solo escribe en el dominio real; en local/previews, modo demo (o ?klaviyo=live para QA manual). */
  const KLAVIYO = { publicKey: 'VSxNKZ', listId: 'VKFykc', source: 'Coming Soon' };
  const KLAVIYO_LIVE = /(^|.)pomponbrand.(com|es)$/.test(location.hostname) || q.get('klaviyo') === 'live';
  const UTM = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(k => { const v = q.get(k); if (v) UTM[k] = v.slice(0, 100); });
  async function subscribeKlaviyo(email) {
    const body = { data: { type: 'subscription', attributes: {
      custom_source: KLAVIYO.source,
      profile: { data: { type: 'profile', attributes: { email, properties: Object.assign({ $source: KLAVIYO.source, idioma: lang, landing: 'coming_soon' }, UTM) } } }
    }, relationships: { list: { data: { type: 'list', id: KLAVIYO.listId } } } } };
    const r = await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=' + KLAVIYO.publicKey, {
      method: 'POST', headers: { 'Content-Type': 'application/vnd.api+json', 'revision': '2024-10-15' }, body: JSON.stringify(body)
    });
    if (r.status !== 202 && !r.ok) throw new Error('klaviyo ' + r.status);
  }

  /* subscription form */
  const form = $('#sub-form'), card = $('#card'), field = $('#field'), input = $('#email'), btn = $('#sub-btn'), msg = $('#email-msg'), under = $('#card-done');
  let fState = 'idle';
  const valid = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  function setForm(s) { fState = s; refreshForm(); }
  function refreshForm() {
    field.classList.toggle('has-error', fState === 'error');
    input.setAttribute('aria-invalid', String(fState === 'error'));
    msg.textContent = fState === 'error' ? t('errEmail') : fState === 'network' ? t('errNet') : '';
    btn.disabled = fState === 'sending'; form.setAttribute('aria-busy', String(fState === 'sending'));
    btn.textContent = fState === 'sending' ? t('sending') : t('subBtn');
  }
  function succeed(instant) {
    under.removeAttribute('aria-hidden');
    if (instant) { card.classList.add('is-done'); return; }
    card.classList.add('is-tearing');
    setTimeout(() => { card.classList.add('is-done'); card.classList.remove('is-tearing'); form.inert = true; under.setAttribute('tabindex', '-1'); under.focus({ preventScroll: true }); }, reduce.matches ? 320 : 1150);
  }
  input.addEventListener('input', () => { if (fState === 'error' || fState === 'network') setForm('idle'); });
  form.addEventListener('submit', async e => {
    e.preventDefault(); if (fState === 'sending') return;
    if (!valid(input.value)) { setForm('error'); input.focus(); return; }
    setForm('sending');
    if (form.website && form.website.value) return; /* honeypot: bot */
    try {
      if (KLAVIYO_LIVE) {
        await subscribeKlaviyo(input.value.trim());
      } else {
        await new Promise(r => setTimeout(r, 1200)); /* modo demo fuera del dominio real: no escribe en Klaviyo */
      }
      setForm('done'); succeed(false);
    } catch (err) { setForm('network'); }
  });



  $$('.lang button').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(buildTicker, 200); });

  applyLang(lang);

  /* estados forzados por URL (frames de documentación): ?form=focus|error|sending|success|network  ?mosaic=hover */
  const fs = q.get('form');
  if (fs) {
    if (fs !== 'focus' && fs !== 'idle') input.value = fs === 'error' ? 'ana@correo' : 'ana@correo.com';
    if (fs === 'focus') field.classList.add('is-focus');
    else if (fs === 'success') { setForm('done'); succeed(true); }
    else if (T.es && ['error', 'sending', 'network'].includes(fs)) setForm(fs);
  }
  if (q.get('mosaic') === 'hover') setHover(true);
})();
