// Seletor de variante (tamanho/personalização) para produtos cujo preço
// muda por opção. Mesmo padrão do qty-stepper: devolve o elemento pronto
// pra montar no card + uma função pra ler o que está selecionado.

import { formatPrice } from './whatsapp.js';

export function buildVariantSelect(product) {
  if (!product.variants || !product.variants.length) {
    return { wrap: null, getSelected: () => null };
  }

  const wrap = document.createElement('div');
  wrap.className = 'variant-select';

  const select = document.createElement('select');
  select.className = 'variant-select__input';
  select.setAttribute('aria-label', 'Opção');

  product.variants.forEach((variant, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `${variant.label} — ${formatPrice(variant.price)}`;
    select.append(option);
  });

  wrap.append(select);

  return {
    wrap,
    getSelected: () => product.variants[Number(select.value)],
    onChange: (handler) => select.addEventListener('change', handler),
  };
}
