import { Injectable, inject, APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coreTokens, brandColors, Brand } from './tokens';

@Injectable()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private currentBrand: Brand = 'default';

  /**
   * Translates TS tokens into native CSS variables at the :root level
   * defaults to the 'default' brand.
   */
  public initializeTokens(brand: Brand = 'default'): void {
    const root = this.document.documentElement;
    root.setAttribute('data-theme', brand);
    this.currentBrand = brand;
    console.log('DS: brand ', brand)
    console.log('DS: brandColors ', brandColors[brand])

    // Apply core shared tokens
    this.applyTokens(root, 'spacing', coreTokens.spacing);
    this.applyTokens(root, 'font-family', coreTokens.font.family);
    this.applyTokens(root, 'font-size', coreTokens.font.size);
    this.applyTokens(root, 'font-weight', coreTokens.font.weight);
    this.applyTokens(root, 'radius', coreTokens.radius);

    // Apply specific brand colors
    this.applyTokens(root, 'color', brandColors[brand].color);
  }

  /**
   * Switches the active brand theme dynamically.
   */
  public switchTheme(brand: Brand): void {
    if (this.currentBrand === brand) return;

    this.currentBrand = brand;
    const root = this.document.documentElement;

    // We only need to swap colors, as coreTokens are brand-agnostic
    this.applyTokens(root, 'color', brandColors[brand].color);
  }

  private applyTokens(root: HTMLElement, prefix: string, tokens: Record<string, string>): void {
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(`--${prefix}-${this.toKebabCase(key)}`, value);
    });
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}

export function provideThemeService(defaultBrand: Brand = 'default'): EnvironmentProviders {
  return makeEnvironmentProviders([
    ThemeService,
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const themeService = inject(ThemeService);
        return () => themeService.initializeTokens(defaultBrand);
      },
      multi: true
    }
  ]);
}

