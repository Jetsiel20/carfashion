// Filtro de categorias do catálogo. Os links do nav são gerados a partir
// dos dados dos produtos (uma única fonte de verdade — a lista de
// categorias não é escrita à mão no HTML, então não tem como ficar
// dessincronizada da real). Clicar num link filtra e re-renderiza o
// catálogo.

// Em "Todos" (sem filtro), mostrar os produtos na ordem crua do arquivo
// agrupa tudo por categoria — quem entra vê só canecas nas primeiras
// fileiras, e só depois bonés, camisetas etc. Isso passa a impressão de
// loja pequena/pouco variada. Intercalar uma categoria de cada vez (sem
// dado nenhum de vendas, já que não há backend) resolve isso: a primeira
// fileira já mostra uma amostra de cada categoria que a loja tem.
function orderForVariety(products) {
  const byCategory = new Map();
  for (const product of products) {
    if (!byCategory.has(product.category)) byCategory.set(product.category, []);
    byCategory.get(product.category).push(product);
  }
  const buckets = [...byCategory.values()];

  const interleaved = [];
  for (let i = 0; interleaved.length < products.length; i++) {
    for (const bucket of buckets) {
      if (i < bucket.length) interleaved.push(bucket[i]);
    }
  }
  return interleaved;
}

export function initCatalogFilter({ listEl, products, catalogGrid, renderCatalog }) {
  const categories = [...new Set(products.map((product) => product.category))];
  const variedProducts = orderForVariety(products);

  renderCatalog(catalogGrid, variedProducts);
  listEl.replaceChildren();

  function buildLink(label, category) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#catalogo';
    a.className = 'site-nav__link';
    a.textContent = label;
    a.dataset.category = category ?? '';
    li.append(a);
    return a;
  }

  const links = [buildLink('Todos', null), ...categories.map((category) => buildLink(category, category))];
  links[0].classList.add('is-active');
  links.forEach((link) => listEl.append(link.parentElement));

  listEl.addEventListener('click', (event) => {
    const link = event.target.closest('.site-nav__link');
    if (!link) return;
    event.preventDefault();

    links.forEach((a) => a.classList.remove('is-active'));
    link.classList.add('is-active');

    const category = link.dataset.category;
    const filtered = category ? products.filter((product) => product.category === category) : variedProducts;
    renderCatalog(catalogGrid, filtered);

    // O preventDefault acima bloqueia o salto nativo do link (href
    // "#catalogo") — sem isso, clicar numa categoria filtrava o catálogo
    // mas não levava o usuário até ele.
    catalogGrid.closest('#catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
