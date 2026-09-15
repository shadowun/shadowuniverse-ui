export class SuActionContainer extends HTMLElement {
    connectedCallback(): void {
        // Keeps it accessible for screen readers grouping interactive elements
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'group');
        }
    }
}

export function registerSuActionContainer(): void {
    if (!customElements.get('su-action-container')) {
        customElements.define('su-action-container', SuActionContainer);
    }
}