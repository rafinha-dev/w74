// Acordeões exclusivos da seção Soluções (painel 2).
(() => {
  const panel = document.querySelector('.panel-2');
  if (!panel) return;
  const triggers = [...panel.querySelectorAll('.accordion-trigger')];

  function setExpanded(trigger, expanded) {
    const content = document.getElementById(trigger.getAttribute('aria-controls'));
    trigger.setAttribute('aria-expanded', String(expanded));
    content.hidden = !expanded;
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') !== 'true';
      triggers.forEach(item => setExpanded(item, item === trigger && expanded));
    });
    trigger.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown') next = (index + 1) % triggers.length;
      if (event.key === 'ArrowUp') next = (index - 1 + triggers.length) % triggers.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = triggers.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        triggers[next].focus();
      }
    });
  });
})();
