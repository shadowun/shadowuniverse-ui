export class SuMenu extends HTMLElement {
  // Store the timer so we can clean it up later
  private clockTimer?: number;

  static get observedAttributes(): string[] {
    // Added 'apps-config' to the watch list
    return ['active-tab', 'apps-config', 'active-app', 'notified-apps'];
  }

  connectedCallback(): void {
    this.render();
    this.startClock();
  }

  disconnectedCallback(): void {
    // Prevent memory leaks if the component is removed
    if (this.clockTimer) window.clearInterval(this.clockTimer);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
      // Because render() rewrites the HTML, we need to restart the clock hook
      this.startClock();
    }
  }

  startClock(): void {
    if (this.clockTimer) window.clearInterval(this.clockTimer);

    const clockEl = this.querySelector('.su-clock-display');
    const updateTime = () => {
      if (clockEl) {
        // Formats to standard "12:22 AM" based on the user's local system time
        clockEl.textContent = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        });
      }
    };

    updateTime(); // Run immediately
    this.clockTimer = window.setInterval(updateTime, 1000); // Update every second
  }

  render(): void {
    const activeTab = this.getAttribute('active-tab') || 'home';
    const activeApp = this.getAttribute('active-app') || null;
    const notifiedApps = (this.getAttribute('notified-apps') || '').split(',');

    const mainNav = [
      { id: 'home', type: 'page', label: 'SHADOW UNIVERSE', href: 'https://www.shadowuniverse.xyz', icon: 'icon-home', external: false },
      { id: 'wtf', type: 'page', label: 'UNIVERSE.wtf', href: 'https://www.universe.wtf', icon: 'icon-universewtf', external: false },
      { id: 'la', type: 'page', label: 'UNIVERSE.la', href: 'https://www.universe.la', icon: 'icon-universela', external: false },
    ];

    const defaultAppNav = [
      { id: 'vimeo', type: 'app', label: 'Vimeo', href: 'https://www.vimeo.com/shadowuniverse', icon: 'icon-vimeo', external: true },
      { id: 'youtube', type: 'app', label: 'YouTube', href: 'https://www.youtube.com/channel/shadow-universe', icon: 'icon-youtube', external: true },
      { id: 'instagram', type: 'app', label: 'Instagram', href: 'https://www.instagram.com/shadowuniverse.xyz', icon: 'icon-instagram', external: true },
      { id: 'discord', type: 'app', label: 'Discord', href: 'https://discord.gg/JFtxx959', icon: 'icon-discord', external: true },
    ];

    let appNav = defaultAppNav;
    const customAppsAttr = this.getAttribute('apps-config');

    if (customAppsAttr) {
      try {
        appNav = JSON.parse(customAppsAttr);
      } catch (e) {
        console.error('su-menu: Invalid JSON in apps-config attribute', e);
      }
    }

    const createLink = (item: any, activeId: string | null) => {
      const isActive = activeId === item.id;
      const hasNotification = notifiedApps.includes(item.id);

      const ariaAttr = (isActive && item.type === 'page') ? 'aria-current="page"' : '';
      const targetAttr = item.external ? 'target="_blank" rel="noopener noreferrer"' : 'rel="noreferrer"';

      return `
        <li class="nav-item ${item.id}">
          <a href="${item.href}" 
             class="nav-link ${isActive ? 'is-active' : ''} ${hasNotification ? 'has-notification' : ''}" 
             ${ariaAttr} 
             ${targetAttr}
             aria-label="${item.label}">
            <span class="su-nav-icon ${item.icon}" aria-hidden="true"></span>
            <span class="nav-label">${item.label}</span>
          </a>
        </li>
      `;
    };

    this.innerHTML = `
      <nav class="su-menu-bar" aria-label="Main Navigation">
        <div class="nav-group pages">
          <ul>${mainNav.map(item => createLink(item, activeTab)).join('')}</ul>
        </div>

        <div class="nav-group apps">
          <ul>${appNav.map(item => createLink(item, activeApp)).join('')}</ul>
          <!-- THE NEW CLOCK -->
          <div class="su-clock" aria-hidden="true">
            <span class="su-clock-display"></span>
          </div>
        </div>
      </nav>
    `;
  }
}

export function registerSuMenu(): void {
  if (!customElements.get('su-menu')) {
    customElements.define('su-menu', SuMenu);
  }
}