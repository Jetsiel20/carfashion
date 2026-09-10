// Sistema de reveal ao rolar, reutilizável em qualquer seção. Cada elemento
// aparece com fade + leve deslocamento quando entra na tela, uma vez só.

const DEFAULT_STAGGER_MS = 60;

export function initScrollReveal(items, { stagger = DEFAULT_STAGGER_MS } = {}) {
  const list = [...items];
  if (!list.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    list.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    // O delay usa a posição dentro desta tanda que entrou junto na tela,
    // não a posição na lista inteira — senão, com muitos itens, um scroll
    // rápido faz cards já visíveis ficarem "escondidas" por segundos.
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry, index) => {
        entry.target.style.transitionDelay = `${index * stagger}ms`;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
  }, { threshold: 0.1 });

  list.forEach((el) => observer.observe(el));
}
