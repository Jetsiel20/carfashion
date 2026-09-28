// =========================================================
// AVISO DE PRIVACIDADE
// =========================================================
//
// A CarFashion atualmente não utiliza cookies de rastreamento,
// Google Analytics ou pixels de publicidade.
//
// Este aviso informa sobre recursos essenciais e serviços
// externos utilizados pelo site.
//
// A confirmação de leitura é armazenada apenas no
// localStorage do navegador.
// =========================================================

// Mantém a chave existente para não repetir o aviso a quem já respondeu.
const STORAGE_KEY = 'carfashion_privacy_choice';

function acknowledgeNotice() {
  try {
    localStorage.setItem(STORAGE_KEY, 'acknowledged');
  } catch {
    // Se o navegador bloquear localStorage,
    // o site continua funcionando normalmente.
  }
}

function hasAcknowledgedNotice() {
  try {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

async function closeBanner(banner) {
  banner.classList.add('privacy-banner--closing');
  // Usa a duração real do CSS; sem animação, remove imediatamente.
  const animations = banner.getAnimations?.() ?? [];
  await Promise.allSettled(animations.map((animation) => animation.finished));
  banner.remove();
}

export function initPrivacyBanner() {
  // Inclui as respostas salvas pela versão anterior do aviso.
  if (hasAcknowledgedNotice()) return;

  // Evita duplicidade.
  if (document.querySelector('.privacy-banner')) return;

  const banner = document.createElement('aside');

  banner.className = 'privacy-banner';

  banner.setAttribute(
    'aria-label',
    'Aviso de privacidade'
  );

  const content = document.createElement('div');
  content.className = 'privacy-banner__content';
  const text = document.createElement('div');
  text.className = 'privacy-banner__text';
  const title = document.createElement('strong');
  title.textContent = 'Sua privacidade importa';
  const description = document.createElement('p');
  description.textContent = 'A CarFashion não utiliza cookies de rastreamento ou publicidade. Alguns recursos externos podem processar dados técnicos necessários para o funcionamento do site.';
  const link = document.createElement('a');
  link.href = 'privacidade.html';
  link.textContent = 'Saiba mais';
  text.append(title, description, link);

  const actions = document.createElement('div');
  actions.className = 'privacy-banner__actions';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'privacy-banner__button';
  button.textContent = 'Entendi';
  actions.append(button);
  content.append(text, actions);
  banner.append(content);

  document.body.append(banner);

  // Pequeno atraso apenas para a animação visual.
  requestAnimationFrame(() => {
    banner.classList.add(
      'privacy-banner--visible'
    );
  });

  button.addEventListener('click', () => {
    button.disabled = true;
    acknowledgeNotice();
    closeBanner(banner);
  }, { once: true });
}
