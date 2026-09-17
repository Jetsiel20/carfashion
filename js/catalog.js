// =========================================================
// CATÁLOGO
// =========================================================
//
// Renderiza os produtos e envia os pedidos
// diretamente para o WhatsApp.
//
// =========================================================

import {
  requestOrder,
  formatPrice,
} from './whatsapp.js';

import {
  buildQtyStepper,
} from './qty-stepper.js';

import {
  buildProductMedia,
} from './carousel.js';

import {
  buildVariantSelect,
} from './variant-select.js';

import {
  initScrollReveal,
} from './reveal.js';

/* =========================================================
   CARD DO PRODUTO
   ========================================================= */

function buildProductCard(product) {

  const card =
    document.createElement('div');

  card.className =
    product.featured
      ? 'product-card product-card--featured reveal'
      : 'product-card reveal';

  /* IMAGEM */

  const media =
    buildProductMedia(product);

  /* CONTEÚDO */

  const body =
    document.createElement('div');

  body.className =
    'product-card__body';

  /* NOME */

  const name =
    document.createElement('div');

  name.className =
    'product-card__name';

  name.textContent =
    product.name;

  /* DESCRIÇÃO */

  const desc =
    document.createElement('p');

  desc.className =
    'product-card__desc';

  desc.textContent =
    product.description ?? '';

  /* PREÇO */

  const price =
    document.createElement('div');

  price.className =
    'product-card__price';

  /* VARIANTES */

  const {
    wrap: variantWrap,
    getSelected,
    onChange,
  } = buildVariantSelect(product);

  /* ATUALIZAR PREÇO */

  const updatePrice = () => {

    const variant =
      getSelected();

    const currentPrice =
      variant?.price ??
      product.price;

    if (
      Number.isFinite(
        Number(currentPrice)
      )
    ) {
      price.textContent =
        formatPrice(currentPrice);
    } else {
      price.textContent =
        'Consultar valor';
    }
  };

  updatePrice();

  onChange?.(updatePrice);

  /* QUANTIDADE */

  const {
    wrap: qtyWrap,
    input: qtyInput,
  } = buildQtyStepper();

  /* BOTÃO WHATSAPP */

  const button =
    document.createElement('button');

  button.className =
    'btn-cf-whatsapp';

  button.type =
    'button';

  button.textContent =
    'Pedir pelo WhatsApp';

  button.setAttribute(
    'aria-label',
    `Pedir ${product.name} pelo WhatsApp`
  );

  /* =======================================================
     PEDIDO
     ======================================================= */

  button.addEventListener(
    'click',
    () => {

      const quantity =
        Math.max(
          1,
          Number.parseInt(
            qtyInput.value,
            10
          ) || 1
        );

      requestOrder(
        product,
        quantity,
        getSelected()
      );
    }
  );

  /* =======================================================
     MONTAGEM
     ======================================================= */

  body.append(
    name,
    desc,
    price
  );

  if (variantWrap) {
    body.append(
      variantWrap
    );
  }

  body.append(
    qtyWrap,
    button
  );

  card.append(
    media,
    body
  );

  return card;
}

/* =========================================================
   RENDERIZAÇÃO
   ========================================================= */

export function renderCatalog(
  container,
  items
) {

  container.replaceChildren();

  for (const product of items) {
    container.append(
      buildProductCard(product)
    );
  }

  initScrollReveal(
    container.querySelectorAll(
      '.product-card'
    )
  );
}