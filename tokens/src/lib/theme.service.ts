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
  public switchTheme(brand: Brand = 'base'): void {
    if (this.currentBrand === brand) return;
    this.currentBrand = brand;
    const root = this.document.documentElement;
    root.setAttribute('data-theme', brand);
    const brandTokens = brands[brand];

    // Apply all tokens recursively
    Object.entries(brandTokens).forEach(([key, value]) => {
      if (key === 'asset' || key === 'icon') {
        this.applyAssets(root, this.toKebabCase(key), value);
      } else {
        this.applyTokens(root, this.toKebabCase(key), value);
      }
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

  private applyAssets(root: HTMLElement, prefix: string, tokens: any): void {
    if (!tokens || typeof tokens !== 'object') return;

    // Font Assets
    const fontAssets = tokens.font || (prefix === 'font' ? tokens : null);
    if (fontAssets && typeof fontAssets === 'object') {
      let fontFaceString = '';
      Object.values(fontAssets).forEach((font: any) => {
        if (font.name && font.ttf) {
          fontFaceString += `
            @font-face {
              font-family: '${font.name}';
              src: url('/tokens/${this.currentBrand}/${font.ttf}') format('truetype');
              font-weight: ${font.weight || 'normal'};
              font-style: ${font.style || 'normal'};
              font-display: swap;
            }
          `;
        }
      });

      if (fontFaceString) {
        let styleTag = this.document.getElementById('theme-assets') as HTMLStyleElement;
        if (!styleTag) {
          styleTag = this.document.createElement('style');
          styleTag.id = 'theme-assets';
          this.document.head.appendChild(styleTag);
        }
        styleTag.textContent = fontFaceString;
      }
    }

    // Icon Assets
    const iconAssets = tokens.icon || (prefix === 'icon' ? tokens : null);
    if (iconAssets && typeof iconAssets === 'object') {
      Object.entries(iconAssets).forEach(([key, value]: [string, any]) => {
        const iconUrl = typeof value === 'string' ? value : value.value;
        if (iconUrl) {
          root.style.setProperty(`--icon-${this.toKebabCase(key)}`, iconUrl);
        }
      });
    }
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}

