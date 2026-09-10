// Ano do copyright no rodapé — usado em toda página que tem o rodapé.

export function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}
