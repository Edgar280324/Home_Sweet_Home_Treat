const toggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;

toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', next);
    toggleBtn.textContent = next === 'dark' ? "☀ Modo claro" : "🌙 Modo oscuro";
});
