// Ponto de entrada. Bloco 2: conecta os dados de produtos ao catálogo.
// Carrinho e envio do pedido via WhatsApp entram nos próximos blocos,
// cada um no seu próprio módulo (cart.js, whatsapp.js...).

import { products } from './products.js';
import { renderCatalog } from './catalog.js';
import { initStatsCounters } from './stats.js';

const catalogGrid = document.getElementById('catalog-grid');
if (catalogGrid) {
  renderCatalog(catalogGrid, products);
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
  initStatsCounters(statsSection);
}

const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
