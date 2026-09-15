// Import Classes & Registrars
import { SuButton, registerSuButton } from './elements/basic/su-button/su-button.ts';
import { SuClock, registerSuClock } from './elements/basic/su-clock/su-clock.ts';
import { SuEmbed, registerSuEmbed } from './elements/basic/su-embed/su-embed.ts';
import { SuActionContainer, registerSuActionContainer } from './elements/containers/su-action-container/su-action-container.ts';
import { SuCookie, registerSuCookie } from './elements/composites/su-cookie/su-cookie.ts';
import { SuMenu, registerSuMenu } from './elements/composites/su-menu/su-menu.ts';
import './css/style.css';

// Master Registration Helper
export function registerAllComponents(): void {
    registerSuButton();
    registerSuClock();
    registerSuEmbed();
    registerSuActionContainer();
    registerSuCookie();
    registerSuMenu();
}

// Named Exports
export {
    SuButton, registerSuButton,
    SuClock, registerSuClock,
    SuEmbed, registerSuEmbed,
    SuActionContainer, registerSuActionContainer,
    SuCookie, registerSuCookie,
    SuMenu, registerSuMenu
};