import { Injectable, inject, APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coreTokens, brands, Brand } from './tokens';

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
  public switchTheme(brand: Brand = 'default'): void {
    if (this.currentBrand === brand) return;
    this.currentBrand = brand;
    const root = this.document.documentElement;
    root.setAttribute('data-theme', brand);
    this.currentBrand = brand;
    const brandTokens = brands[brand];

    // Apply core shared tokens
    this.applyTokens(root, 'spacing', brandTokens.spacing);
    this.applyTokens(root, 'font-family', brandTokens.font.family);
    this.applyTokens(root, 'font-size', brandTokens.font.size);
    this.applyTokens(root, 'font-weight', brandTokens.font.weight);
    this.applyTokens(root, 'radius', brandTokens.radius);

    // Apply specific brand colors
    this.applyTokens(root, 'color', brandTokens.color);
  }

  private applyTokens(root: HTMLElement, prefix: string, tokens: Record<string, string>): void {
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(`--${prefix}-${this.toKebabCase(key)}`, value);
    });
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  private applyFontTokens(root: HTMLElement, tokens: Record<string, string>): void {
    // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    // <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel = "stylesheet" />
    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
    this.document.head.appendChild(link);

    const link2 = this.document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
    this.document.head.appendChild(link2);
  }
}

