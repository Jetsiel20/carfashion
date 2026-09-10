// Vitrine de trabalhos — carrossel via CSS scroll-snap nativo (sem
// biblioteca). O JS só move o scroll ao clicar nas flechas; o swipe/drag
// já funciona sozinho por ser scroll de verdade.

export function initGallery(section) {
  const track = section.querySelector('.gallery__track');
  const prevBtn = section.querySelector('.gallery__btn--prev');
  const nextBtn = section.querySelector('.gallery__btn--next');
  if (!track || !prevBtn || !nextBtn) return;

  function scrollByOneItem(direction) {
    const item = track.querySelector('.gallery__img');
    if (!item) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const amount = item.getBoundingClientRect().width + gap;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => scrollByOneItem(-1));
  nextBtn.addEventListener('click', () => scrollByOneItem(1));
}
