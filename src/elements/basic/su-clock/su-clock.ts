export class SuClock extends HTMLElement {
    // 1. Declare the interval property (optional number)
    private _interval?: number;

    connectedCallback(): void {
        const tick = () => {
            this.textContent = `${new Date().toISOString().substring(11, 19)} UTC`;
        };
        tick();

        // 2. TS now knows this is a valid assignment
        this._interval = window.setInterval(tick, 1000);
    }

    disconnectedCallback(): void {
        if (this._interval !== undefined) {
            window.clearInterval(this._interval);
        }
    }
}

export function registerSuClock(): void {
    if (!customElements.get('su-clock')) {
        customElements.define('su-clock', SuClock);
    }
}