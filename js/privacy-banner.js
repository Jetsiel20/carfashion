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
// A preferência do visitante é armazenada apenas no
// localStorage do navegador.
// =========================================================

const STORAGE_KEY = 'carfashion_privacy_choice';

function saveChoice(choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Se o navegador bloquear localStorage,
    // o site continua funcionando normalmente.
  }
}

function getChoice() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function closeBanner(banner) {
  banner.classList.add('privacy-banner--closing');

  window.setTimeout(() => {
    banner.remove();
  }, 250);
}

export function initPrivacyBanner() {
  // Já existe uma preferência salva.
  if (getChoice()) return;

  // Evita duplicidade.
  if (document.querySelector('.privacy-banner')) return;

  const banner = document.createElement('aside');

  banner.className = 'privacy-banner';

  banner.setAttribute(
    'aria-label',
    'Aviso de privacidade'
  );

  banner.innerHTML = `
    <div class="privacy-banner__content">

      <div class="privacy-banner__text">

        <strong>
          Sua privacidade importa
        </strong>

        <p>
          A CarFashion não utiliza cookies de rastreamento
          ou publicidade. Alguns recursos externos podem
          processar dados técnicos necessários para o
          funcionamento do site.
        </p>

        <a href="privacidade.html">
          Saiba mais
        </a>

      </div>

      <div class="privacy-banner__actions">

        <button
          type="button"
          class="privacy-banner__button
                 privacy-banner__button--secondary"
          data-privacy-action="reject"
        >
          Recusar
        </button>

        <button
          type="button"
          class="privacy-banner__button
                 privacy-banner__button--primary"
          data-privacy-action="accept"
        >
          Aceitar
        </button>

      </div>

    </div>
  `;

  document.body.append(banner);

  // Pequeno atraso apenas para a animação visual.
  requestAnimationFrame(() => {
    banner.classList.add(
      'privacy-banner--visible'
    );
  });

  banner.addEventListener('click', (event) => {
    const button = event.target.closest(
      '[data-privacy-action]'
    );

    if (!button) return;

    const choice =
      button.dataset.privacyAction;

    saveChoice(choice);

    closeBanner(banner);
  });
}