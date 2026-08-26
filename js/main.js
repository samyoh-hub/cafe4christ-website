/* ============================================================
   Cafe4Christ — Main JS
   ============================================================ */

/* ---- Sticky nav shadow on scroll ---- */
(function () {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- Mobile hamburger menu ---- */
(function () {
  const btn     = document.getElementById('hamburger');
  const links   = document.getElementById('nav-links');
  const navCta  = document.querySelector('.nav-cta');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    btn.classList.toggle('open', !isOpen);
    links.classList.toggle('nav-open', !isOpen);
    if (navCta) navCta.classList.toggle('nav-open', !isOpen);
  });

  // Close menu when a nav link is clicked
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('open');
      links.classList.remove('nav-open');
      if (navCta) navCta.classList.remove('nav-open');
    });
  });
})();

/* ---- Accordion ---- */
(function () {
  const items = document.querySelectorAll('.acc-item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.acc-trigger');
    const body    = item.querySelector('.acc-body');
    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all
      items.forEach(i => {
        const t = i.querySelector('.acc-trigger');
        const b = i.querySelector('.acc-body');
        if (t) t.setAttribute('aria-expanded', 'false');
        if (b) b.hidden = true;
      });

      // If it wasn't open, open it
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        body.hidden = false;
      }
    });
  });
})();

/* ---- Contact form — Formspree AJAX submission ---- */
(function () {
  const form    = document.getElementById('contact-form');
  const submit  = document.getElementById('contact-submit');
  const note    = document.getElementById('form-note');
  const success = document.getElementById('form-success');
  const error   = document.getElementById('form-error');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    submit.disabled = true;
    submit.textContent = 'Sending…';
    error.hidden = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (note)    note.hidden    = true;
        success.hidden = false;
        submit.hidden  = true;
      } else {
        throw new Error('non-ok response');
      }
    } catch (_) {
      error.hidden   = false;
      submit.disabled   = false;
      submit.textContent = 'Send Message';
    }
  });
})();

/* ---- Smooth scroll for in-page anchor links ---- */
(function () {
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
    10
  ) || 68;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
