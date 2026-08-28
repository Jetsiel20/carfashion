// Bloco 2/3: renderiza o catálogo e liga cada card ao pedido via WhatsApp.
// Puro DOM (sem innerHTML) para manter o hábito seguro mesmo com dados locais.

import { requestOrder, preloadProductImage, formatPrice } from './whatsapp.js';
import { buildQtyStepper } from './qty-stepper.js';
import { buildProductMedia } from './carousel.js';
import { initScrollReveal } from './reveal.js';

function buildProductCard(product) {
  preloadProductImage(product);

  const card = document.createElement('div');
  card.className = product.featured
    ? 'product-card product-card--featured reveal'
    : 'product-card reveal';

  const media = buildProductMedia(product);

  const body = document.createElement('div');
  body.className = 'product-card__body';

  const name = document.createElement('div');
  name.className = 'product-card__name';
  name.textContent = product.name;

  const desc = document.createElement('p');
  desc.className = 'product-card__desc';
  desc.textContent = product.description;

  const price = document.createElement('div');
  price.className = 'product-card__price';
  price.textContent = formatPrice(product.price);

  const { wrap: qtyWrap, input: qtyInput } = buildQtyStepper();

  const button = document.createElement('button');
  button.className = 'btn-cf-whatsapp mt-3';
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
  return card;
}

export function renderCatalog(container, items) {
  container.replaceChildren();
  for (const product of items) {
    container.append(buildProductCard(product));
  }
  initScrollReveal(container.querySelectorAll('.product-card'));
}
