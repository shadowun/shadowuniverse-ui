export class SuEmbed extends HTMLElement {
    connectedCallback() {
        const ratio = this.getAttribute('ratio') || '16-9';
        this.classList.add('embed-container', `aspect-${ratio}`);
    }
}

export function registerSuEmbed(): void {
    if (!customElements.get('su-embed')) {
        customElements.define('su-embed', SuEmbed);
    }
}