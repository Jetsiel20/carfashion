// Filtro de categorias do catálogo.
// Os links do nav são gerados a partir dos dados de products.js,
// mantendo products.js como única fonte de verdade.
//
// Quando "Todos" estiver ativo, o catálogo respeita exatamente
// a ordem dos produtos definida em products.js.

export function initCatalogFilter({
  listEl,
  products,
  catalogGrid,
  renderCatalog,
}) {
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Renderiza inicialmente respeitando a ordem de products.js.
  renderCatalog(catalogGrid, products);

  // Limpa a lista de categorias antes de reconstruí-la.
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

  const links = [
    buildLink('Todos', null),
    ...categories.map((category) =>
      buildLink(category, category)
    ),
  ];

  links[0].classList.add('is-active');

  links.forEach((link) => {
    listEl.append(link.parentElement);
  });

  listEl.addEventListener('click', (event) => {
    const link = event.target.closest('.site-nav__link');

    if (!link) return;

    event.preventDefault();

    links.forEach((a) => {
      a.classList.remove('is-active');
    });

    link.classList.add('is-active');

    const category = link.dataset.category;

    const filtered = category
      ? products.filter(
          (product) => product.category === category
        )
      : products;

    renderCatalog(catalogGrid, filtered);

    // Como o preventDefault bloqueia o salto natural do href="#catalogo",
    // fazemos o scroll manualmente após aplicar o filtro.
    catalogGrid
      .closest('#catalogo')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  });
}