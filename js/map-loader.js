// O embed do Google Maps pode gravar cookies do Google assim que o
// iframe carrega, mesmo sem o visitante interagir. Pra manter a
// política de privacidade honesta ("este site não usa cookies próprios"),
// o mapa só entra no DOM quando a pessoa pede — clicando no botão.

export function initMapLoader(mapEl) {
  const button = mapEl.querySelector('.location__map-load');
  const src = mapEl.dataset.mapSrc;
  if (!button || !src) return;

  button.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.title = mapEl.dataset.mapTitle || 'Mapa';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    mapEl.replaceChildren(iframe);
  });
}
