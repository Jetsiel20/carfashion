// Bloco 2: catálogo. Dados de exemplo — nomes, preços e foto (logo como
// placeholder) até o CEO enviar fotos e preços reais de cada produto.
// Estrutura fixa: quando a data real chegar, só se troca este array.

export const products = [
  {
    id: 'caneca-classica',
    name: 'Caneca personalizada',
    category: 'Canecas',
    price: 55.0,
    image: 'img/img-blanco.webp',
    // Demo visual do carrossel de cores (Bloco 5.1) — pedido do CEO para ver
    // como fica antes de decidir se o carrossel também serve pra escolher a cor.
    images: [
      'img/img-blanco.webp',
      'img/img-azul.webp',
      'img/img-verde.webp',
      'img/img-amarillo.webp',
      'img/img-naranja.webp',
      'img/img-roja.webp',
      'img/img-rosada.webp',
      'img/img-negro.webp',
    ],
    description: 'Branca, com sua foto ou design',
  },
  {
    id: 'caneca-magica',
    name: 'Caneca mágica',
    category: 'Canecas',
    price: 65.0,
    image: 'img/logo-carfashion.webp',
    description: 'Muda de cor com o calor',
  },
  {
    id: 'bone',
    name: 'Boné personalizado',
    category: 'Bonés',
    price: 45.0,
    image: 'img/logo-carfashion.webp',
    description: 'Bordado ou estampa DTF',
  },
  {
    id: 'moletom',
    name: 'Moletom personalizado',
    category: 'Moletons',
    price: 120.0,
    image: 'img/logo-carfashion.webp',
    description: 'Unissex, várias cores',
  },
  {
    id: 'almofada',
    name: 'Almofada personalizada',
    category: 'Almofadas',
    price: 40.0,
    image: 'img/logo-carfashion.webp',
    description: 'Capa + enchimento incluídos',
  },
  {
    id: 'regata',
    name: 'Regata personalizada',
    category: 'Regatas',
    price: 50.0,
    image: 'img/logo-carfashion.webp',
    description: 'Malha leve, ideal para o verão',
  },
  {
    id: 'dtf-metro',
    name: 'DTF por metro',
    category: 'DTF',
    price: 35.0,
    image: 'img/logo-carfashion.webp',
    description: 'Transfer para aplicar você mesmo',
  },
];
