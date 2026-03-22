# 🎨 Trevvo Design System

A state-of-the-art, multi-brand, multi-platform design system built with **Nx**, **Angular**, **Tailwind CSS**, and **Style Dictionary**.

---

## 🚀 Vision & Philosophy

This project is a collaborative effort between **Micael Bissoni** (Human Architect) and **Antigravity** (AI Assistant), designed to provide a truly modular, scalable, and atomic UI foundation for the Trevvo ecosystem.

We leverage:
- **Atomic Design**: From the smallest Atoms to complex Organisms.
- **Domain-Driven Design (DDD)**: Clear separation of concerns and ubiquitous language.
- **Microfrontends**: Independent, decoupled architectural units.
- **TDD first**: 100% test coverage and behavioral verification.
- **Multi-Brand Support**: Native CSS variables managed via Style Dictionary.

---

## 🛠️ Project Structure

The monorepo is organized as follows:
- `tokens/`: The "Single Source of Truth" for design values.
- `ui-components/`: The core library of reusable Angular components.
- `.agents/`: Specialized AI rules, skills, and workflows to maintain architectural integrity.
- `public/`: Assets, branding tokens, and internationalization files.

---

## 🤖 Agentic Architecture

To ensure the highest quality and consistency, we use specialized AI Skills and Rules:
- **[Atomic UI Architect](.agents/skills/atomic-ui-architect/SKILL.md)**: Guides the creation of UI components using Atomic Design principles.
- **[Design System Architect](.agents/skills/design-system-architect/SKILL.md)**: Manages the Storybook and token infrastructure.
- **[Component Factory](.agents/skills/component-factory/SKILL.md)**: Standardizes the creation of "Design System Ready" components with integrated Providers.

---

## ⚙️ Core Workflows

### 1. Build Design Tokens
```sh
npm run build:tokens
```

### 2. Run Storybook
```sh
npm run storybook
```

### 3. Generate New Component
Use the **Component Factory** skill for step-by-step guidance.

## ⚙️ Installation

To use the Trevvo Design System in your Angular project, you can install it directly from GitHub:

```sh
npm install git+https://github.com/micael-bissoni/design-system.git --save
```

### Peer Dependencies
Ensure you have the following dependencies installed in your project:
- **Angular**: ^21.0.0
- **Tailwind CSS**: ^3.0.0
- **NgRx Store**: ^21.0.0 (if using i18n features)

---

## 📖 Basic Usage

### 1. Configure Tailwind
Add the design system preset to your `tailwind.config.js`:

```javascript
module.exports = {
  presets: [require('@design-system/tokens/tailwind.preset')],
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@design-system/ui-components/**/*.{mjs,js,ts}"
  ],
  // ...
}
```

### 2. Import Components
Import the standalone components directly into your Angular modules or components:

```typescript
import { ButtonComponent } from '@design-system/ui-components';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `<default-button>Click Me</default-button>`
})
export class MyComponent {}
```

---

## 🏗️ Microfrontend (MFE) Integration

To consume this design system in your Nx Angular MFE applications, follow these steps:

### 1. Tailwind Configuration
In your MFE's `tailwind.config.js`, extend the design system's preset:

```javascript
const { createGlobPatternsForDependentProjects } = require('@nx/angular/src/utils/generate-microsite-tailwind-config');
const designSystemPreset = require('../../tailwind.preset.js'); // Adjust path

module.exports = {
  presets: [designSystemPreset],
  content: [
    './src/**/*.{html,ts}',
    ...createGlobPatternsForDependentProjects(__dirname),
  ],
  // ... rest of your config
};
```

### 2. Loading Brand Tokens
The design system uses CSS variables loaded dynamically. Ensure your app shell or MFE initializes the `ThemeService`:

```typescript
// app.config.ts or main.ts
import { ThemeService } from '@design-system/tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => () => themeService.initializeTokens('brand-1'),
      deps: [ThemeService],
      multi: true
    }
  ]
};
```

### 3. Internationalization (i18n)
Register the `LocaleService` and provide the required NgRx store states if your MFE needs to be locale-aware.

```typescript
import { LocaleService, i18nReducer } from '@design-system/ui-components';

// In your Store providers
provideStore({ i18n: i18nReducer })
```

---

## 🤝 Co-Creators

- **Micael Bissoni** - Lead Architect & Core Developer
- **Antigravity (AI)** - Agentic Coding Assistant

*Developed with ❤️ to empower developers and designers.*
