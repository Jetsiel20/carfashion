// Contador de satisfação: anima cada número de 0 até data-target quando
// a seção entra na tela (IntersectionObserver, dispara uma única vez).

const DURATION_MS = 2500;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(el, value) {
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }) + suffix;
}

function setFinalValue(el) {
  el.textContent = formatValue(el, parseFloat(el.dataset.target));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / DURATION_MS, 1);
    el.textContent = formatValue(el, target * easeOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

export function initStatsCounters(container) {
  const items = container.querySelectorAll('[data-target]');
  if (!items.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => setFinalValue(el));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1 });

  items.forEach((el) => observer.observe(el));
}
