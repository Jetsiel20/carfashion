// Bloco 3: pedido direto por produto via WhatsApp.
// Em navegadores/celulares compatíveis, abre o painel nativo de "compartilhar"
// já com a imagem do produto + texto do pedido (Web Share API, nível 2 —
// arquivos). Sem suporte, cai para um link wa.me só com texto e o cliente
// anexa a imagem manualmente no chat.
//
// Importante: o fallback (window.open) só funciona se rodar ainda dentro do
// gesto de clique do usuário. Por isso o suporte a compartilhar arquivo é
// checado de forma síncrona (sem rede) antes de decidir o caminho, e a
// imagem é pré-carregada com antecedência (ver preloadProductImage).

// Número confirmado a partir do banner oficial (img/carfashion.jpeg): (49) 98878-9396.
const WHATSAPP_NUMBER = '5549988789396';

const imageBlobCache = new Map();

export function preloadProductImage(product) {
  if (imageBlobCache.has(product.id)) return;
  imageBlobCache.set(
    product.id,
    fetch(product.image)
      .then((response) => response.blob())
      .catch(() => null)
  );
}

export function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function buildMessage(product, quantity) {
  return [
    'Olá! Quero fazer um pedido:',
    '',
    `Produto: ${product.name}`,
    `Quantidade: ${quantity}`,
    `Preço unitário: ${formatPrice(product.price)}`,
  ].join('\n');
}

function buildWaLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Checagem 100% síncrona (sem fetch) pra não gastar o gesto do usuário
// em navegadores que não suportam compartilhar arquivos (ex.: desktop).
function canShareFiles() {
  if (!navigator.share || !navigator.canShare) return false;
  const probe = new File([], 'probe.jpg', { type: 'image/jpeg' });
  return navigator.canShare({ files: [probe] });
}

// Retorna 'shared' | 'cancelled' | 'unsupported'.
async function tryShareWithImage(product, text) {
  if (!canShareFiles()) return 'unsupported';

  const blob = await (
    imageBlobCache.get(product.id) ??
    fetch(product.image).then((r) => r.blob()).catch(() => null)
  );
  if (!blob) return 'unsupported';

  const file = new File([blob], product.image.split('/').pop(), { type: blob.type });
  try {
    await navigator.share({ files: [file], text, title: product.name });
    return 'shared';
  } catch (error) {
    if (error && error.name === 'AbortError') return 'cancelled';
    return 'unsupported';
  }
}

export async function requestOrder(product, quantity) {
  const text = buildMessage(product, quantity);
  const result = await tryShareWithImage(product, text);
  if (result === 'unsupported') {
    window.open(buildWaLink(text), '_blank', 'noopener');
  }
}
