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
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const index = list.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.max(index, 0) * stagger}ms`;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  }, { threshold: 0.1 });

  list.forEach((el) => observer.observe(el));
}
