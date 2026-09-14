// Ponto de entrada: liga cada módulo (nav, catálogo, filtro, rodapé) aos
// seus elementos no DOM. Sem carrinho — cada pedido sai direto pelo WhatsApp.

import { products } from './products.js';
import { renderCatalog } from './catalog.js';
import { initMobileNav } from './nav.js';
import { initCatalogFilter } from './catalog-filter.js';
import { initGallery } from './gallery.js';
import { initFooterYear } from './footer-year.js';
import { initMapLoader } from './map-loader.js';
import { loadPartial } from './partials.js';

const siteNav = document.querySelector('.site-nav');
if (siteNav) {
  initMobileNav(siteNav);
}

const gallerySection = document.querySelector('.gallery');
if (gallerySection) {
  initGallery(gallerySection);
}

const catalogGrid = document.getElementById('catalog-grid');
const navCategories = document.getElementById('nav-categories');

if (navCategories && catalogGrid) {
  initCatalogFilter({ listEl: navCategories, products, catalogGrid, renderCatalog });
}

await loadPartial('#footer-slot', 'partials/footer.html');
initFooterYear();

const locationMap = document.getElementById('location-map');
if (locationMap) {
  initMapLoader(locationMap);
}
