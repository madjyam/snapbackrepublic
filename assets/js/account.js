(() => {
  const tabs = document.querySelectorAll('.tab');
  const login = document.getElementById('login-form');
  const register = document.getElementById('register-form');
  const USER_KEY = 'sr_user';

  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const tab = t.getAttribute('data-tab');
    if (tab === 'login') { login.classList.add('visible'); register.classList.remove('visible'); }
    else { register.classList.add('visible'); login.classList.remove('visible'); }
  }));

  login?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(login);
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '');
    if (username.length < 2 || password.length < 6) return alert('Invalid credentials');
    localStorage.setItem(USER_KEY, JSON.stringify({ username }));
    alert(`Welcome back, ${username}!`);
  });

  register?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(register);
    const username = String(fd.get('username') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');
    const emailOk = /.+@.+\..+/.test(email);
    if (username.length < 2 || !emailOk || password.length < 6) return alert('Please enter valid details');
    localStorage.setItem(USER_KEY, JSON.stringify({ username, email }));
    alert(`Account created. Welcome, ${username}!`);
  });

  // Set default visible
  login?.classList.add('visible');
})();

