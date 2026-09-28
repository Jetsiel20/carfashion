// Menu hambúrguer do nav mobile — colapsa/expande a lista de categorias.
// No desktop o botão fica oculto via CSS e isto não faz nada.

export function initMobileNav(nav) {
  const toggle = nav.querySelector('.site-nav__toggle');
  const menu = nav.querySelector('.site-nav__menu');
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu de categorias');
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu de categorias' : 'Abrir menu de categorias');
  });

  // As categorias são criadas depois da inicialização do menu.
  menu.addEventListener('click', (event) => {
    if (event.target.closest('.site-nav__link')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      const focusWasInMenu = menu.contains(document.activeElement);
      closeMenu();
      if (focusWasInMenu) toggle.focus();
    }
  });
}
