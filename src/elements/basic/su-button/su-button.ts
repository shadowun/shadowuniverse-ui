export class SuButton extends HTMLElement {
    connectedCallback() {
        this.setAttribute('role', 'button');
        if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
    }
}

export function registerSuButton(): void {
    if (!customElements.get('su-button')) {
        customElements.define('su-button', SuButton);
    }
}