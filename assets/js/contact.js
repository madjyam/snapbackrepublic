(() => {
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();
    const emailOk = /.+@.+\..+/.test(email);
    if (name.length < 2 || !emailOk || message.length < 5) return alert('Please fill all fields correctly.');
    alert('Message sent! We will get back to you shortly.');
    form.reset();
  });
})();

