const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.menu-overlay');
let lastFocused = null;
const tablet = window.matchMedia('(min-width: 768px)');
menu.inert = !tablet.matches;

function setMenu(open, restoreFocus = true) {
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.inert = !open && !tablet.matches;
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    lastFocused = document.activeElement;
    menu.querySelector('a').focus();
  } else if (lastFocused && restoreFocus) {
    lastFocused.focus();
    lastFocused = null;
  } else if (!open) {
    lastFocused = null;
  }
}

toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
overlay.addEventListener('click', () => setMenu(false));

// Alinha o início da seção imediatamente abaixo do cabeçalho fixo.

function goToSection(hash) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;
  const header = document.querySelector('.site-header');
  const offset = header ? header.getBoundingClientRect().height : 0;
  const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
  window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  history.replaceState(null, '', hash);
}
menu.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const hash = link.getAttribute('href');
  if (!document.getElementById(hash.slice(1))) return;
  event.preventDefault();
  setMenu(false, false);
  requestAnimationFrame(() => goToSection(hash));
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
});

// Ao alternar entre mobile e tablet, restaura o menu horizontal.

tablet.addEventListener('change', () => {
  setMenu(false, false);
  menu.inert = !tablet.matches;
});
