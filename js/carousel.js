// Carrossel de fotos do card de produto. Demo visual (Bloco 5.1): só troca
// a foto ao clicar nas flechas. Ainda não decide cor nenhuma nem entra na
// mensagem do WhatsApp — isso fica pra quando o CEO confirmar se o
// carrossel também serve de seletor.

export function buildProductMedia(product) {
  const images = product.images && product.images.length > 1 ? product.images : [product.image];

  const media = document.createElement('div');
  media.className = 'product-card__media';

  const img = document.createElement('img');
  img.className = 'product-card__img';
  img.src = images[0];
  img.alt = product.name;
  img.loading = 'lazy';
  media.append(img);

  if (images.length > 1) {
    let index = 0;
    const show = (nextIndex) => {
      index = (nextIndex + images.length) % images.length;
      img.src = images[index];
    };

    const prevBtn = buildCarouselBtn('prev', '‹', 'Foto anterior', () => show(index - 1));
    const nextBtn = buildCarouselBtn('next', '›', 'Próxima foto', () => show(index + 1));

    media.append(prevBtn, nextBtn);
  }

  return media;
}

function buildCarouselBtn(direction, glyph, label, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `icon-btn product-card__carousel-btn product-card__carousel-btn--${direction}`;
  btn.setAttribute('aria-label', label);
  btn.textContent = glyph;
  btn.addEventListener('click', onClick);
  return btn;
}
