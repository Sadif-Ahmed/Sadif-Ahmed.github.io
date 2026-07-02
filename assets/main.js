(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem('sa-theme');
  const theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.setAttribute('data-theme', theme);

  function updateThemeBtn(btn, t) {
    btn.innerHTML = t === 'dark' ? '☀️ <span>Light</span>' : '🌙 <span>Dark</span>';
  }

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    updateThemeBtn(themeBtn, theme);
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('sa-theme', next);
      updateThemeBtn(themeBtn, next);
    });
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  const menuBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    };
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  const yearEl = document.getElementById('cur-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
