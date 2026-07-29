// Bloco 2/3: renderiza o catálogo e liga cada card ao pedido via WhatsApp.
// Puro DOM (sem innerHTML) para manter o hábito seguro mesmo com dados locais.

import { requestOrder, preloadProductImage, formatPrice } from './whatsapp.js';

function buildQtyStepper() {
  const wrap = document.createElement('div');
  wrap.className = 'qty-stepper';

  const input = document.createElement('input');
  input.type = 'number';
  input.min = '1';
  input.step = '1';
  input.value = '1';
  input.className = 'qty-stepper__input';
  input.setAttribute('aria-label', 'Quantidade');

  wrap.append(input);
  return { wrap, input };
}

// Demo visual (Bloco 5.1): só troca a foto ao clicar nas flechas.
// Ainda não decide cor nenhuma nem entra na mensagem do WhatsApp — isso
// fica pra quando o CEO confirmar se o carrossel também serve de seletor.
function buildProductMedia(product) {
  const images = product.images && product.images.length > 1 ? product.images : [product.image];

  const media = document.createElement('div');
  media.className = 'product-card__media';

  const img = document.createElement('img');
  img.className = 'product-card__img';
  img.src = images[0];
  img.alt = product.name;
  media.append(img);

  if (images.length > 1) {
    let index = 0;
    const show = (nextIndex) => {
      index = (nextIndex + images.length) % images.length;
      img.src = images[index];
    };

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'product-card__carousel-btn product-card__carousel-btn--prev';
    prevBtn.setAttribute('aria-label', 'Foto anterior');
    prevBtn.textContent = '‹';
    prevBtn.addEventListener('click', () => show(index - 1));

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'product-card__carousel-btn product-card__carousel-btn--next';
    nextBtn.setAttribute('aria-label', 'Próxima foto');
    nextBtn.textContent = '›';
    nextBtn.addEventListener('click', () => show(index + 1));

    media.append(prevBtn, nextBtn);
  }

  return media;
}

function buildProductCard(product) {
  preloadProductImage(product);

  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

  const card = document.createElement('div');
  card.className = 'product-card';

  const media = buildProductMedia(product);

  const body = document.createElement('div');
  body.className = 'product-card__body';

  const name = document.createElement('div');
  name.className = 'product-card__name';
  name.textContent = product.name;

  const desc = document.createElement('p');
  desc.className = 'text-muted mb-2';
  desc.style.fontSize = 'var(--fs-sm)';
  desc.textContent = product.description;

  const price = document.createElement('div');
  price.className = 'product-card__price';
  price.textContent = formatPrice(product.price);

  const { wrap: qtyWrap, input: qtyInput } = buildQtyStepper();

  const button = document.createElement('button');
  button.className = 'btn-cf-whatsapp w-100 mt-3';
  button.type = 'button';
  button.textContent = 'Pedir pelo WhatsApp';

  button.addEventListener('click', async () => {
    const quantity = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Abrindo WhatsApp…';
    try {
      await requestOrder(product, quantity);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  body.append(name, desc, price, qtyWrap, button);
  card.append(media, body);
  col.append(card);
  return col;
}

export function renderCatalog(container, items) {
  container.replaceChildren();
  for (const product of items) {
    container.append(buildProductCard(product));
  }
}
