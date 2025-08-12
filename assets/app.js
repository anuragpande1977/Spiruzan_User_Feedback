const SCRIPT_URL = https://script.google.com/macros/s/AKfycbwixJ9ycF3svdeSlZFYESTTqGWBXVCc-09AZMJf9RXZzJqLmy1D0WxkLWf3P_6_8lVw/exec;  // <-- paste your Apps Script URL

document.getElementById('yr').textContent = new Date().getFullYear();

const form = document.getElementById('form');
const okBox = document.getElementById('okBox');
const errBox = document.getElementById('errBox');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  okBox.style.display = 'none';
  errBox.style.display = 'none';

  if (!form.petSpecies.value || !document.getElementById('consent').checked) {
    errBox.textContent = 'Please select Pet Species and accept consent.';
    errBox.style.display = 'block';
    return;
  }
  if (form.website.value) return; // honeypot

  submitBtn.disabled = true;

  const getChecks = (name) =>
    [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value);

  const payload = {
    petSpecies: form.petSpecies.value,
    petAge: form.petAge.value,
    petWeight: form.petWeight.value,
    healthIssues: getChecks('healthIssues'),
    chronic: form.chronic.value.trim(),
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
    sideEffects: form.sideEffects.value.trim(),
    continueUse: form.continueUse.value,
    freeText: form.freeText.value.trim()
  };

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // opaque but fine for logging
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    okBox.style.display = 'block';
    form.reset();
    submitBtn.disabled = false;
    ['ease','mobility','coat','immune','energy'].forEach(n => { if (form[n]) form[n].value = 3; });
  } catch (e2) {
    errBox.textContent = 'Network error. Please try again.';
    errBox.style.display = 'block';
    submitBtn.disabled = false;
  }
});
