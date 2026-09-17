// Catálogo real, preço de varejo.
// Produtos sem foto definitiva usam PLACEHOLDER até a imagem final ser adicionada.
// Onde o preço muda por opção, o produto usa `variants` em vez de `price` fixo.
//
// Ordem comercial do catálogo:
// Camisetas → Moletons → Bonés → Canecas → Copos e térmicos
// → Presentes → Almofadas → Azulejos → Chaveiros → DTF → Serviços.
//
// Pendentes de confirmação comercial:
// - nomes/descrições exatas dos 3 produtos térmicos de 500ml;
// - preço infantil da camiseta polo;
// - detalhes de "Currículo impresso";
// - detalhes de "Mesa de trabalho".

const PLACEHOLDER = 'img/logo-carfashion.webp';

export const products = [
  // =========================================================
  // CAMISETAS
  // =========================================================

{
  id: 'camiseta-polo',
  name: 'Camiseta Polo',
  category: 'Camisetas',
  price: 135.00,
  image: 'img/polo.webp',
  description: 'Modelo adulto. Tamanho infantil a confirmar.',
},
{
  id: 'camiseta-algodao-p',
  name: 'Camiseta Algodão Premium — Personalizada',
  category: 'Camisetas',
  image: 'img/algodon-p.webp',
  description: 'Camiseta em algodão premium com personalização.',
  variants: [
    { label: 'Infantil', price: 68.98 },
    { label: 'Adulto', price: 95.00 },
  ],
},
{
  id: 'camiseta-algodao-sp',
  name: 'Camiseta Algodão Premium — Lisa',
  category: 'Camisetas',
  image: 'img/camiseta-s.webp',
  description: 'Camiseta em algodão premium, sem personalização.',
  variants: [
    { label: 'Infantil', price: 55.00 },
    { label: 'Adulto', price: 65.00 },
  ],
},
{
  id: 'camiseta-poliester-p',
  name: 'Camiseta UV 50+ em Poliéster — Personalizada',
  category: 'Camisetas',
  image: 'img/uv-p.webp',
  description: 'Camiseta em poliéster com proteção UV 50+ e personalização.',
  variants: [
    { label: 'Infantil', price: 56.00 },
    { label: 'Adulto', price: 68.00 },
  ],
},
{
  id: 'camiseta-poliester-sp',
  name: 'Camiseta UV 50+ em Poliéster — Lisa',
  category: 'Camisetas',
  image: 'img/poliester-s.webp',
  description: 'Camiseta em poliéster com proteção UV 50+, sem personalização.',
  variants: [
    { label: 'Infantil', price: 28.00 },
    { label: 'Adulto', price: 40.00 },
  ],
},
{
  id: 'camiseta-pv-p',
  name: 'Camiseta Semi-algodão — Personalizada',
  category: 'Camisetas',
  image: 'img/p-c.webp',
  description: 'Camiseta em tecido de poliéster + algodão com personalização.',
  variants: [
    { label: 'Infantil', price: 45.00 },
    { label: 'Adulto', price: 75.00 },
  ],
},
{
  id: 'camiseta-pv-sp',
  name: 'Camiseta Semi-algodão — Lisa',
  category: 'Camisetas',
  image: 'img/ra.webp',
  description: 'Camiseta em tecido de poliéster + algodão, sem personalização.',
  variants: [
    { label: 'Infantil', price: 35.00 },
    { label: 'Adulto', price: 55.00 },
  ],
},


{
  id: 'camiseta-helanca-p',
  name: 'Camiseta Helanca — Personalizada',
  category: 'Camisetas',
  image: 'img/h-personalizada.webp',
  description: 'Camiseta em helanca com personalização.',
  variants: [
    { label: 'Infantil', price: 40.00 },
    { label: 'Adulto', price: 55.00 },
  ],
},



{
  id: 'camiseta-helanca-sp',
  name: 'Camiseta Helanca — Lisa',
  category: 'Camisetas',
  image: 'img/camisa-helanga.webp',
  description: 'Camiseta em helanca, sem personalização.',
  variants: [
    { label: 'Infantil', price: 24.00 },
    { label: 'Adulto', price: 35.00 },
  ],
},


 
  // =========================================================
  // MOLETONS
  // =========================================================

  {
    id: 'moletom-capuz-p',
    name: 'Moletom com capuz e bolso personalizado',
    category: 'Moletons',
    image: 'img/cp.webp',
    description: 'Com capuz e bolso frontal',
    variants: [
      { label: 'Infantil', price: 82.00 },
      { label: 'Adulto', price: 169.99 },
    ],
  },

  {
    id: 'moletom-capuz-sp',
    name: 'Moletom com capuz e bolso',
    category: 'Moletons',
    image: 'img/moleton-3.webp',
    description: 'Sem personalizar',
    variants: [
      { label: 'Infantil', price: 53.00 },
      { label: 'Adulto', price: 99.99 },
    ],
  },

  {
    id: 'moletom-liso-p',
    name: 'Moletom liso personalizado',
    category: 'Moletons',
    image: 'img/mp.webp',
    description: 'Sem capuz e sem bolso',
    variants: [
      { label: 'Infantil', price: 65.00 },
      { label: 'Adulto', price: 86.00 },
    ],
  },

  {
    id: 'moletom-liso-sp',
    name: 'Moletom liso',
    category: 'Moletons',
    image: 'img/vo.webp',
    description: 'Sem capuz, sem bolso, sem personalizar',
    variants: [
      { label: 'Infantil', price: 47.00 },
      { label: 'Adulto', price: 75.00 },
    ],
  },

  // =========================================================
  // BONÉS
  // =========================================================

  {
    id: 'bone',
    name: 'Boné',
    category: 'Bonés',
    image: 'img/bone.webp',
    description: 'Bordado ou estampa DTF',
    variants: [
      { label: 'Sem personalizar', price: 44.00 },
      { label: 'Personalizado', price: 50.00 },
      { label: 'Personalizado com tela', price: 55.00 },
    ],
  },

  // =========================================================
  // CANECAS
  // =========================================================

  {
    id: 'caneca-branca',
    name: 'Caneca branca 325ml',
    category: 'Canecas',
    price: 38.99,
    image: 'img/caneca-branca.webp',
    description: '325ml, pronta para sua arte',
  },

  {
    id: 'caneca-colorida',
    name: 'Caneca colorida 325ml',
    category: 'Canecas',
    price: 44.99,
    image: 'img/img-azul.webp',
    images: [
      'img/img-azul.webp',
      'img/img-verde.webp',
      'img/img-amarillo.webp',
      'img/img-naranja.webp',
      'img/img-roja.webp',
      'img/img-rosada.webp',
      'img/img-negro.webp',
    ],
    description: '325ml, várias cores disponíveis',
  },

  {
    id: 'caneca-preta-tarja',
    name: 'Caneca preta com tarja branca',
    category: 'Canecas',
    price: 57.50,
    image: 'img/ct.webp',
    description: 'Preta, com área branca para personalizar',
  },

  {
    id: 'caneca-magica',
    name: 'Caneca mágica 325ml',
    category: 'Canecas',
    price: 54.99,
    image: PLACEHOLDER,
    description: 'Muda de cor com o calor',
  },

  // =========================================================
  // COPOS E TÉRMICOS
  // =========================================================

  {
    id: 'bombona-chimarrao',
    name: 'Bombona de chimarrão inox',
    category: 'Copos e térmicos',
    price: 62.99,
    image: 'img/bombona-chimarrao.webp',
    description: 'Térmica, em aço inox',
  },

  {
    id: 'copo-termico-1200',
    name: 'Copo térmico 1200ml',
    category: 'Copos e térmicos',
    price: 145.00,
    image: PLACEHOLDER,
    description: 'Térmico grande, com alça',
  },

  {
    id: 'copo-termico-500-a',
    name: 'Copo térmico 500ml',
    category: 'Copos e térmicos',
    price: 65.00,
    image: PLACEHOLDER,
    description: 'Térmico em aço inox',
  },

  {
    id: 'copo-termico-500-b',
    name: 'Copo térmico 500ml — linha colorida',
    category: 'Copos e térmicos',
    price: 125.00,
    image: PLACEHOLDER,
    description: 'Térmico, linha colorida',
  },

  {
    id: 'copo-termico-500-c',
    name: 'Garrafa térmica 500ml',
    category: 'Copos e térmicos',
    price: 110.00,
    image: PLACEHOLDER,
    description: 'Térmica, com alça de transporte',
  },

  {
    id: 'copo-termico-600',
    name: 'Copo térmico 600ml',
    category: 'Copos e térmicos',
    price: 65.00,
    image: PLACEHOLDER,
    description: 'Térmico em aço inox',
  },

  {
    id: 'copo-termico-473',
    name: 'Copo térmico 473ml',
    category: 'Copos e térmicos',
    price: 65.00,
    image: PLACEHOLDER,
    description: 'Térmico em aço inox',
  },

  {
    id: 'copo-termico-360',
    name: 'Copo térmico 360ml',
    category: 'Copos e térmicos',
    price: 52.00,
    image: PLACEHOLDER,
    description: 'Térmico em aço inox',
  },

  {
    id: 'copo-cuia-inox-350',
    name: 'Copo cuia inox 350ml',
    category: 'Copos e térmicos',
    price: 51.99,
    image: PLACEHOLDER,
    description: 'Térmico, em aço inox',
  },

  {
    id: 'copo-inox-260',
    name: 'Copo inox 260ml',
    category: 'Copos e térmicos',
    price: 69.99,
    image: PLACEHOLDER,
    description: 'Térmico, em aço inox',
  },

  {
    id: 'cuia-madeira',
    name: 'Cuia de madeira',
    category: 'Copos e térmicos',
    price: 89.99,
    image: PLACEHOLDER,
    description: 'Para chimarrão, acabamento em madeira',
  },

  {
    id: 'cuia-porongo',
    name: 'Cuia de porongo',
    category: 'Copos e térmicos',
    price: 48.99,
    image: PLACEHOLDER,
    description: 'Para chimarrão, porongo natural',
  },

  // =========================================================
  // PRESENTES
  // =========================================================

  {
    id: 'kit-xicaras',
    name: 'Kit 4 xícaras 200ml + suporte de metal',
    category: 'Presentes',
    price: 154.00,
    image: PLACEHOLDER,
    description: 'Conjunto completo com suporte',
  },

  {
    id: 'caneta-emborrachada',
    name: 'Caneta emborrachada',
    category: 'Presentes',
    price: 24.99,
    image: PLACEHOLDER,
    description: 'Personalizada',
  },

  {
    id: 'toalha-mao',
    name: 'Toalha de mão 54x28cm',
    category: 'Presentes',
    price: 15.00,
    image: PLACEHOLDER,
    description: 'Personalizada',
  },

  {
    id: 'ima-coracao',
    name: 'Ímã em formato de coração',
    category: 'Presentes',
    price: 11.00,
    image: PLACEHOLDER,
    description: 'Personalizado',
  },

  {
    id: 'ima-quadrado',
    name: 'Ímã quadrado acrílico — 2 peças',
    category: 'Presentes',
    price: 11.00,
    image: PLACEHOLDER,
    description: 'Personalizado, 4mm',
  },

  // =========================================================
  // ALMOFADAS
  // =========================================================

  {
    id: 'almofada',
    name: 'Almofada personalizada',
    category: 'Almofadas',
    image: PLACEHOLDER,
    description: 'Capa personalizada',
    variants: [
      { label: 'Sem recheio', price: 28.99 },
      { label: 'Com recheio', price: 68.99 },
    ],
  },

  // =========================================================
  // AZULEJOS
  // =========================================================

  {
    id: 'azulejo',
    name: 'Azulejo cerâmico personalizado',
    category: 'Azulejos',
    image: PLACEHOLDER,
    description: 'Cerâmica personalizada, várias medidas',
    variants: [
      { label: '10x10cm', price: 15.40 },
      { label: '15x15cm', price: 25.00 },
      { label: '20x20cm', price: 27.00 },
      { label: '20x30cm', price: 37.50 },
    ],
  },

  // =========================================================
  // CHAVEIROS
  // =========================================================

  {
    id: 'chaveiro-acrilico',
    name: 'Chaveiro acrílico',
    category: 'Chaveiros',
    price: 25.00,
    image: PLACEHOLDER,
    description: 'Redondo ou quadrado — informe o formato no pedido',
  },

  {
    id: 'chaveiro-pequeno',
    name: 'Chaveiro pequeno',
    category: 'Chaveiros',
    price: 7.00,
    image: PLACEHOLDER,
    description: 'Personalizado',
  },

  // =========================================================
  // DTF
  // =========================================================

  {
    id: 'dtf-metro',
    name: 'Metro de DTF',
    category: 'DTF',
    price: 115.00,
    image: PLACEHOLDER,
    description: 'Transfer para aplicar você mesmo',
  },

  {
    id: 'dtf-metro-uv',
    name: 'Metro de DTF UV',
    category: 'DTF',
    price: 180.00,
    image: PLACEHOLDER,
    description: 'Transfer UV para aplicar você mesmo',
  },

  // =========================================================
  // SERVIÇOS
  // =========================================================

  {
    id: 'gravacao-laser-nome',
    name: 'Gravação a laser — nome',
    category: 'Serviços',
    price: 20.00,
    image: PLACEHOLDER,
    description: 'Gravação a laser de nome em peça própria ou do cliente',
  },

  {
    id: 'gravacao-laser-fotos',
    name: 'Gravação a laser — fotos',
    category: 'Serviços',
    price: 45.00,
    image: PLACEHOLDER,
    description: 'Gravação a laser de foto',
  },

  {
    id: 'gravacao-laser-copo',
    name: 'Gravação a laser — copo completo',
    category: 'Serviços',
    price: 56.00,
    image: PLACEHOLDER,
    description: 'Gravação a laser cobrindo todo o copo',
  },

  {
    id: 'curriculum',
    name: 'Currículo impresso',
    category: 'Serviços',
    price: 10.00,
    image: PLACEHOLDER,
    description: 'Detalhes do serviço a confirmar',
  },

  {
    id: 'mesa-trabalho',
    name: 'Mesa de trabalho',
    category: 'Serviços',
    price: 25.00,
    image: PLACEHOLDER,
    description: 'Detalhes do serviço a confirmar',
  },

{
  id: 'suporte-azulejo',
  name: 'Suporte para azulejo — Par',
  category: 'Azulejos',
  price: 3.67,
  image: PLACEHOLDER,
  description:
    'Par de suportes plásticos pretos para exposição de azulejos.',
},

// =========================================================
// INSUMOS
// =========================================================

{
  id: 'folha-sublimacao',
  name: 'Folha para Sublimação',
  category: 'Insumos',
  price: 5.00,
  image: PLACEHOLDER,
  description:
    'Folha para impressão e transferência por sublimação.',
},

];

