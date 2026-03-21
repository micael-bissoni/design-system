import { Injectable, inject, APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { brands, Brand } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private currentBrand?: Brand;

  /**
   * Translates TS tokens into native CSS variables at the :root level
   * defaults to the 'default' brand.
   */
  public initializeTokens(brand: Brand): void {
    this.switchTheme(brand);
  }

  /**
   * Switches the active brand theme dynamically.
   */
  public switchTheme(brand: Brand = 'defaultBrand'): void {
    if (this.currentBrand === brand) return;
    this.currentBrand = brand;
    const root = this.document.documentElement;
    root.setAttribute('data-theme', brand);
    const brandTokens = brands[brand];

    // Apply all tokens recursively
    Object.entries(brandTokens).forEach(([key, value]) => {
      this.applyTokens(root, this.toKebabCase(key), value);
    });
  }

  private applyTokens(root: HTMLElement, prefix: string, tokens: any): void {
    if (typeof tokens === 'string' || typeof tokens === 'number') {
      root.style.setProperty(`--${prefix}`, String(tokens));
      return;
    }

    if (tokens && typeof tokens === 'object') {
      Object.entries(tokens).forEach(([key, value]) => {
        const newPrefix = prefix ? `${prefix}-${this.toKebabCase(key)}` : this.toKebabCase(key);
        this.applyTokens(root, newPrefix, value);
      });
    }
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}

