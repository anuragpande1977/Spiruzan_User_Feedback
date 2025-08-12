// === Spiruzan™ Feedback — Frontend submit logic ===

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwixJ9ycF3svdeSlZFYESTTqGWBXVCc-09AZMJf9RXZzJqLmy1D0WxkLWf3P_6_8lVw/exec";  // Google Apps Script Web App URL

// Footer year
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

// Form elements
const form = document.getElementById('form');
const okBox = document.getElementById('okBox');
const errBox = document.getElementById('errBox');
const submitBtn = document.getElementById('submitBtn');

// Utility: gather checked values for a checkbox group
const getChecks = (name) =>
  [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (okBox) okBox.style.display = 'none';
  if (errBox) errBox.style.display = 'none';

  // Basic required checks
  if (!form.petSpecies.value || !document.getElementById('consent').checked) {
    if (errBox) {
      errBox.textContent = 'Please select Pet Species and accept consent.';
      errBox.style.display = 'block';
    }
    return;
  }

  // Email validation (requires an <input type="email" name="email" required> in your HTML)
  const emailVal = (form.email?.value || '').trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  if (!emailOk) {
    if (errBox) {
      errBox.textContent = 'Please enter a valid email address.';
      errBox.style.display = 'block';
    }
    return;
  }

  // Honeypot (spam trap)
  if (form.website.value) return;

  // Disable button to avoid double submits
  submitBtn.disabled = true;

  // Build payload
  const payload = {
    email: emailVal,                                  // <-- Email now captured
    petSpecies: form.petSpecies.value,
    petAge: form.petAge.value,
    petWeight: form.petWeight.value,
    healthIssues: getChecks('healthIssues'),
    chronic: (form.chronic?.value || '').trim(),
    useDuration: form.useDuration.value,
    frequency: form.frequency.value,
    ease: form.ease.value,
    acceptance: form.acceptance.value,
    mobility: form.mobility.value,
    coat: form.coat.value,
    immune: form.immune.value,
    energy: form.energy.value,
    qolBefore: form.qolBefore.value,
    qolAfter: form.qolAfter.value,
    choiceFactors: getChecks('choiceFactors'),
    confidence: form.confidence.value,
    recommend: form.recommend.value,
    sideEffects: (form.sideEffects?.value || '').trim(),
    continueUse: form.continueUse.value,
    freeText: (form.freeText?.value || '').trim()
  };

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // opaque response; fine for logging to Apps Script
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // Assume success if no network error thrown
    if (okBox) okBox.style.display = 'block';
    form.reset();
    submitBtn.disabled = false;

    // Reset sliders to mid after reset (optional)
    ['ease','mobility','coat','immune','energy'].forEach(n => {
      if (form[n]) form[n].value = 3;
    });

  } catch (e2) {
    if (errBox) {
      errBox.textContent = 'Network error. Please try again.';
      errBox.style.display = 'block';
    }
    submitBtn.disabled = false;
  }
});
