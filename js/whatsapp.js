// =========================================================
// PEDIDOS DIRETOS VIA WHATSAPP
// =========================================================
//
// Todos os pedidos vão diretamente para o WhatsApp oficial
// da CarFashion.
//
// O cliente NÃO precisa ter o número salvo nos contatos.
//
// A mensagem inclui:
// - produto;
// - categoria;
// - descrição;
// - opção selecionada;
// - quantidade;
// - valor unitário;
// - total estimado;
// - link público da imagem.
//
// =========================================================

const WHATSAPP_NUMBER = '5549988789396';

export function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) {
    return '';
  }

  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/* =========================================================
   QUANTIDADE
   ========================================================= */

function normalizeQuantity(quantity) {
  const parsedQuantity =
    Number.parseInt(quantity, 10);

  if (
    !Number.isFinite(parsedQuantity) ||
    parsedQuantity < 1
  ) {
    return 1;
  }

  return parsedQuantity;
}

/* =========================================================
   PREÇO
   ========================================================= */

function getUnitPrice(product, variant) {
  const price =
    variant?.price ??
    product?.price;

  return Number(price);
}

/* =========================================================
   IMAGEM PÚBLICA
   ========================================================= */

function getProductImageUrl(product) {
  if (!product?.image) {
    return null;
  }

  /*
   * Não envia imagens em base64.
   */
  if (product.image.startsWith('data:')) {
    return null;
  }

  try {
    return new URL(
      product.image,
      document.baseURI
    ).href;
  } catch {
    return null;
  }
}

/* =========================================================
   MENSAGEM DO PEDIDO
   ========================================================= */

function buildMessage(
  product,
  quantity,
  variant
) {
  const safeQuantity =
    normalizeQuantity(quantity);

  const unitPrice =
    getUnitPrice(product, variant);

  const hasValidPrice =
    Number.isFinite(unitPrice);

  const total =
    hasValidPrice
      ? unitPrice * safeQuantity
      : null;

  const imageUrl =
    getProductImageUrl(product);

  const lines = [
    'Olá! 👋',
    'Vim pelo site da CarFashion e quero fazer um pedido.',
    '',
    '🛍️ *DADOS DO PEDIDO*',
    '',
    `Produto: ${product.name}`,
  ];

  if (product.category) {
    lines.push(
      `Categoria: ${product.category}`
    );
  }

  if (product.description) {
    lines.push(
      `Descrição: ${product.description}`
    );
  }

  if (variant?.label) {
    lines.push(
      `Opção: ${variant.label}`
    );
  }

  lines.push(
    `Quantidade: ${safeQuantity}`
  );

  if (hasValidPrice) {
    lines.push(
      `Valor unitário: ${formatPrice(unitPrice)}`,
      `Total estimado: ${formatPrice(total)}`
    );
  }

  if (imageUrl) {
    lines.push(
      '',
      '🖼️ *Imagem do produto:*',
      imageUrl
    );
  }

  lines.push(
    '',
    'Gostaria de confirmar os detalhes e finalizar o pedido.',
    '',
    'Pedido iniciado pelo site CarFashion.'
  );

  return lines.join('\n');
}

/* =========================================================
   LINK WHATSAPP
   ========================================================= */

function buildWhatsAppUrl(message) {
  return (
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(message)}`
  );
}

/* =========================================================
   ABRIR PEDIDO
   ========================================================= */

export function requestOrder(
  product,
  quantity,
  variant
) {
  if (!product?.name) {
    console.error(
      'CarFashion: produto inválido para pedido.'
    );

    return;
  }

  const message =
    buildMessage(
      product,
      quantity,
      variant
    );

  const whatsappUrl =
    buildWhatsAppUrl(message);

  /*
   * Vai diretamente para o WhatsApp.
   *
   * Não usa navigator.share.
   * Não abre painel de compartilhamento.
   * Não exige número salvo.
   */
  window.open(
    whatsappUrl,
    '_blank',
    'noopener,noreferrer'
  );
}