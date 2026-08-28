// Ponto de entrada: liga cada módulo (nav, catálogo, rodapé) aos seus
// elementos no DOM. Sem carrinho — cada pedido sai direto pelo WhatsApp.

import { products } from './products.js';
import { renderCatalog } from './catalog.js';
import { initMobileNav } from './nav.js';

const siteNav = document.querySelector('.site-nav');
if (siteNav) {
  initMobileNav(siteNav);
}

const catalogGrid = document.getElementById('catalog-grid');
if (catalogGrid) {
  renderCatalog(catalogGrid, products);
}

const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
