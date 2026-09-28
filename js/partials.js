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
    const html = new DOMParser().parseFromString(await response.text(), 'text/html');
    el.replaceWith(...html.body.childNodes);
  } catch {
    // Preserva o conteúdo alternativo se o recurso não puder ser carregado.
  }
}
