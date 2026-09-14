// Carrega um pedaço de HTML compartilhado (ex.: rodapé, repetido em toda
// página) de um arquivo próprio, em vez de copiar o mesmo HTML em cada
// página — sem build, só fetch. Assim uma mudança no rodapé (endereço,
// horário, redes sociais) é um arquivo só, não um por página.

export async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const response = await fetch(url);
    if (!response.ok) return;
    el.outerHTML = await response.text();
  } catch {
    // Sem conexão/servidor: a página segue funcional, só sem esse pedaço.
  }
}
