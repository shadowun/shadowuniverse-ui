# @shadowuniverse/ui

The elemental design system, CSS architecture, and native Web Component library for the Shadow Universe ecosystem.

This repository is built on a **zero-dependency, unidirectional architecture**. It uses pure standard web technologies (TypeScript, CSS Custom Properties, and Native Web Components) to guarantee absolute framework agnosticism, maximum performance, and zero style leakage.

## 📦 Installation

This package is designed to be consumed directly from GitHub via NPM, or as a Git Submodule for active co-development.

```bash
# Install via NPM Git URL
npm install git+[https://github.com/shadowun/shadowuniverse-ui.git#main](https://github.com/shadowun/shadowuniverse-ui.git#main)
```

*Note: The build step is handled automatically via the `prepare` script during NPM installation.*

## 🚀 Usage

Integrating the UI system into a host application takes two steps: importing the global styles and registering the desired Web Components.

### 1. Import Styles
Import the master stylesheet to inject the CSS variables, base resets, and component styles.

```javascript
import '@shadowuniverse/ui/css';
```

### 2. Register Components
Components are strictly decoupled from the global scope and **do not auto-register** upon import. You must explicitly register them to avoid side effects and allow for aggressive tree-shaking.

```javascript
import { registerAllComponents } from '@shadowuniverse/ui';

// Register the entire ecosystem
registerAllComponents();
```
*Or, register a la carte:*
```javascript
import { registerSuButton, registerSuActionContainer } from '@shadowuniverse/ui';

registerSuButton();
registerSuActionContainer();
```

## 🏗 Architecture

We strictly adhere to a 3-tier Elemental Design philosophy:

1. **/basic**: Irreducible structural blocks (e.g., `<su-button>`, `<su-embed>`). They hold no layout context or business logic.
2. **/containers**: Structural layout wrappers designed explicitly to orchestrate basic elements (e.g., `<su-action-container>`). 
3. **/composites**: Highly opinionated components that compose basics and containers to execute specific business logic (e.g., `<su-cookie>`, `<su-menu>`).

## 🎨 CSS Token System

**No magic numbers are allowed in component stylesheets.** 

All spacing, typography, sizing, and colors must be mapped to the semantic `--su-*` CSS Custom Properties defined in `css/variables.css`. Components dictate structural blueprints; the global variables dictate the aesthetic.