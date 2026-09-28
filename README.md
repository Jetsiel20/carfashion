# carfashion

Site institucional/catálogo da carfashion (sublimação e DTF, Chapecó-SC). Todo pedido sai por **WhatsApp** — não há carrinho, checkout nem pagamento no site.

## Contexto de negócio (por que o site é assim)

- O CEO não quer carrinho/checkout: cada card do catálogo tem botão **"Pedir pelo WhatsApp"** que abre uma conversa já com produto, opção escolhida, quantidade e o link da foto de referência que está visível no card.
- Sem carrinho → sem necessidade de backend, sessão ou banco de dados. Todo o "estado" de um pedido vive só na mensagem que chega no WhatsApp do CEO.
- O catálogo nasceu com 7 produtos de exemplo. A lista de preços real do CEO trouxe **48 produtos reais**, vários com variantes de tamanho/personalização — o projeto cresceu bastante além do escopo inicial, daí este README: documentar a arquitetura antes de crescer mais.

## Stack e por quê

| Peça | Escolha | Por quê |
|---|---|---|
| Estrutura | HTML puro | Sem servidor, sem build — abre em qualquer host estático grátis |
| Layout | Bootstrap 5 (`bootstrap-grid.min.css`, via CDN) | **Só** o bundle de grid/utilitários, não o tema de componentes — todo componente visível é estilo próprio |
| Estilo | CSS puro, com design tokens | `tokens.css` é a fonte única de cor/tipografia/espaçamento |
| Interação | JavaScript vanilla, módulos ES (`type="module"`) | Sem framework — [analisado e descartado React/TypeScript](#por-que-não-react) pelo tamanho e natureza do site |
| Dados | Array JS (`products.js`) | Sem banco de dados — ver [Modelo de dados](#modelo-de-dados-productsjs) |

### Por que não React

Já avaliamos migrar para React/TypeScript quando o catálogo cresceu. Decisão: **não migrar**, porque:
- O site "envia conteúdo" (catálogo + link de WhatsApp), não é uma aplicação com estado complexo — é exatamente o caso de uso onde vanilla JS é a escolha recomendada e React é overhead desnecessário (bundle maior, precisa de build/Node para deploy).
- Os bugs que apareceram até agora (menu mobile cortando categorias, overflow horizontal) eram bugs de **CSS**, não da falta de framework — teriam acontecido do mesmo jeito em React.
- Templates de e-commerce prontos assumem carrinho/checkout/pagamento — o oposto do que este site precisa.

Se o projeto um dia crescer para precisar de conta de usuário, pagamento online ou estado complexo compartilhado, essa decisão deve ser reavaliada — não antes.

## Estrutura do projeto

```
carfasion/
├── index.html              # página principal; catálogo montado por js/main.js
├── css/
│   ├── tokens.css           # cor, tipografia, espaçamento, raio, sombra — fonte única
│   └── styles.css           # todo o estilo visual do site, organizado por componente
├── js/
│   ├── main.js               # ponto de entrada — liga cada módulo aos elementos do DOM
│   ├── products.js           # dados do catálogo (ver Modelo de dados)
│   ├── catalog.js            # monta o card de cada produto e o grid
│   ├── catalog-filter.js     # gera os links de categoria do nav a partir de products.js e filtra
│   ├── carousel.js           # carrossel de fotos dentro de um card (produtos com `images`)
│   ├── variant-select.js     # <select> de variante (tamanho/personalização) quando o preço muda
│   ├── qty-stepper.js        # input numérico de quantidade
│   ├── whatsapp.js           # monta a mensagem e abre o WhatsApp (link direto wa.me)
│   ├── nav.js                # abre/fecha o menu hambúrguer mobile (só isso — agnóstico do conteúdo)
│   └── reveal.js             # sistema reutilizável de fade-in ao rolar (IntersectionObserver)
└── img/                      # fotos e banner
```

**Regra de ouro**: cada módulo em `js/` tem uma responsabilidade só. Antes de adicionar uma função em um arquivo existente, pergunte se ela pertence ali ou merece um módulo novo — foi assim que `qty-stepper.js`, `carousel.js`, `variant-select.js` e `catalog-filter.js` saíram de dentro de `catalog.js` conforme o catálogo crescia.

## Arquitetura: como os módulos se conectam

```
main.js
 ├─ nav.js            → abre/fecha o menu (não sabe o que tem dentro)
 ├─ catalog.js         → renderCatalog(container, items)
 │   ├─ carousel.js         → foto (ou carrossel de fotos) do card
 │   ├─ variant-select.js   → <select> de variante, se o produto tiver
 │   ├─ qty-stepper.js      → input de quantidade
 │   ├─ whatsapp.js         → monta a mensagem e abre o WhatsApp ao clicar
 │   └─ reveal.js           → anima a entrada de cada card ao rolar
 └─ catalog-filter.js  → gera os links de categoria (dados ← products.js) e re-chama renderCatalog(container, filtrado)
```

`renderCatalog(container, items)` é a peça central: tanto a carga inicial quanto o filtro de categoria chamam a mesma função, só muda a lista de produtos passada. Não existe um "modo filtro" separado.

## Modelo de dados (`products.js`)

Cada produto é um objeto. Preço fixo **ou** variantes — nunca os dois:

```js
// Preço único
{
  id: 'caneca-branca',
  name: 'Caneca branca 325ml',
  category: 'Canecas',
  price: 38.99,
  image: 'img/caneca-branca.webp',
  description: '325ml, pronta para sua arte',
}

// Preço por variante (tamanho, personalização etc.) — <select> aparece sozinho no card
{
  id: 'bone',
  name: 'Boné',
  category: 'Bonés',
  image: 'img/logo-carfashion.webp',
  description: 'Bordado ou estampa DTF',
  variants: [
    { label: 'Sem personalizar', price: 44.00 },
    { label: 'Personalizado', price: 50.00 },
    { label: 'Personalizado com tela', price: 55.00 },
  ],
}

// Múltiplas fotos (vira carrossel automaticamente — ver carousel.js)
{
  ...
  image: 'img/img-azul.webp',      // foto inicial; o pedido usa a foto visível no carrossel
  images: ['img/img-azul.webp', 'img/img-verde.webp', /* ... */],
  featured: true,                   // ocupa 2 colunas no grid bento (ver .product-card--featured)
}
```

**Categorias são livres** — o nav em `index.html` não lista categorias fixas; `catalog-filter.js` lê os valores únicos de `category` em `products.js` e gera os links sozinho. Adicionar uma categoria nova é só usar um nome novo em `category` — nada mais para editar.

**Preço de atacado (o "x12" da lista de preços do CEO) fica fora do site** — o CEO não vende no atacado; só o preço de varejo entra em `products.js`.

### Adicionando um produto novo

1. Copie o formato de um produto parecido em `products.js` (com ou sem `variants`).
2. Sem foto real ainda? Use `image: 'img/logo-carfashion.webp'` até incluir a foto definitiva.
3. Nada mais precisa mudar — nav, filtro e renderização pegam o produto automaticamente.

## Convenções do projeto

- **BEM** para classes CSS (`.product-card__body`, `.site-nav__toggle`) — Bootstrap só entra pra grid/spacing (`container`, `row`, `col-*`, `py-5`, `gy-4`). Nunca misturar os dois pro mesmo propósito.
- **Aparência em CSS** — o JS controla apenas o atraso calculado da animação de entrada e o remove ao terminar ou descartar as cards.
- **Sem `innerHTML`** — os módulos de UI usam `createElement`/`append` (mais seguro, hábito mantido mesmo com dados locais e confiáveis).
- **Animações respeitam `prefers-reduced-motion`** — ver `reveal.js`.
- **Responsividade**: menu e alvos de toque usam `768px`; outros componentes têm ajustes próprios. O banner mantém sua proporção em todas as telas.
- **Botão "só ícone"**: sempre usar a classe base `.icon-btn` (32px desktop / 44px mobile) em vez de repetir width/height/cursor em cada botão novo.

## Rodando localmente

Sem build, sem `npm install`. Só precisa de um servidor estático (pra `type="module"` funcionar — abrir o `index.html` direto do disco não funciona por causa do CORS de módulos ES):

```
python -m http.server 8000
```

Depois abrir `http://localhost:8000`.

## Comportamentos importantes

- O aviso de privacidade é informativo: um botão “Entendi” registra a leitura no localStorage. As respostas antigas continuam válidas para não repetir o aviso.
- Quantidades vazias, fracionadas ou menores que 1 são bloqueadas antes de abrir o WhatsApp.
- O carrossel envia a foto visível como referência; cor e disponibilidade são confirmadas na conversa.
- A troca de categoria encerra os observadores de animação anteriores.
- Rodapé e cabeçalho têm links alternativos enquanto os fragmentos carregam ou se a requisição falhar.
- Open Graph, contatos e horário de atendimento já estão configurados.

## Pendências comerciais e de conteúdo

- Confirmar preço infantil da camiseta polo e detalhes do serviço de currículo impresso.
- Validar os nomes e as especificações dos modelos térmicos com o responsável pelo catálogo.
- Confirmar prazos de produção, personalização, condições do parcelamento e envio com a empresa antes de publicar novas promessas.
- Incluir avaliações apenas quando houver depoimentos reais autorizados.
- A compressão das imagens será feita pelo responsável pelo projeto.
