// Cafe for Christ — site interactions

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Accordion */
  const accordion = document.getElementById('accordion');
  if (accordion) {
    const triggers = accordion.querySelectorAll('.acc-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        const body = document.getElementById(trigger.getAttribute('aria-controls'));

        triggers.forEach(t => {
          if (t !== trigger) {
            t.setAttribute('aria-expanded', 'false');
            const b = document.getElementById(t.getAttribute('aria-controls'));
            if (b) b.hidden = true;
          }
        });

        trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (body) body.hidden = expanded;
      });
    });
  }

  /* Contact form (Formspree) */
  const form = document.getElementById('contact-form');
  if (form) {
    const note = document.getElementById('form-note');
    const success = document.getElementById('form-success');
    const error = document.getElementById('form-error');
    const submitBtn = document.getElementById('contact-submit');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      if (note) note.hidden = true;
      if (error) error.hidden = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          if (success) success.hidden = false;
        } else {
          if (error) error.hidden = false;
        }
      } catch (err) {
        if (error) error.hidden = false;
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
      }
    });
  }
});
