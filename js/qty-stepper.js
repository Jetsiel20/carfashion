// Seletor numérico de quantidade usado no card de produto.

export function buildQtyStepper(productName) {
  const wrap = document.createElement('div');
  wrap.className = 'qty-stepper';

  const input = document.createElement('input');
  input.type = 'number';
  input.min = '1';
  input.step = '1';
  input.max = String(Number.MAX_SAFE_INTEGER);
  input.required = true;
  input.value = '1';
  input.className = 'qty-stepper__input';
  input.setAttribute('aria-label', `Quantidade de ${productName}`);

  wrap.append(input);
  return { wrap, input };
}
