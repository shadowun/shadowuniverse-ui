export class SuCookie extends HTMLElement {
  connectedCallback(): void {
    if (localStorage.getItem('su_cookie_consent')) return;

    this.innerHTML = `
      <div class="cookie-banner" role="region" aria-label="Cookie consent banner">
            <p>We use essential functional cookies to keep our ecosystem secure and operational.</p>
            
            <su-action-container>
                <su-button id="cookie-accept" class="sm ghost accept">Accept</su-button>
                <su-button id="cookie-decline" class="sm ghost">Decline</su-button>
            </su-action-container>
        </div>
    `;

    this.querySelector('#cookie-accept')?.addEventListener('click', () => this.setConsent('accepted'));
    this.querySelector('#cookie-decline')?.addEventListener('click', () => this.setConsent('declined'));
  }

  setConsent(value: string): void {
    localStorage.setItem('su_cookie_consent', value);
    this.remove();
  }
}

export function registerSuCookie(): void {
  if (!customElements.get('su-cookie')) {
    customElements.define('su-cookie', SuCookie);
  }
}