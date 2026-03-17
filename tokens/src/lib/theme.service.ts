import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coreTokens, brandColors, Brand } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private currentBrand: Brand = 'trevvo';

  /**
   * Translates TS tokens into native CSS variables at the :root level
   * defaults to the 'trevvo' brand.
   */
  public initializeTokens(brand: Brand = 'trevvo'): void {
    const root = this.document.documentElement;
    this.currentBrand = brand;
    
    // Apply core shared tokens
    this.applyTokens(root, 'spacing', coreTokens.spacing);
    this.applyTokens(root, 'font-family', coreTokens.font.family);
    this.applyTokens(root, 'font-size', coreTokens.font.size);
    this.applyTokens(root, 'font-weight', coreTokens.font.weight);
    this.applyTokens(root, 'radius', coreTokens.radius);

    // Apply specific brand colors
    this.applyTokens(root, 'color', brandColors[brand]);
  }

  /**
   * Switches the active brand theme dynamically.
   */
  public switchTheme(brand: Brand): void {
    if (this.currentBrand === brand) return;
    
    this.currentBrand = brand;
    const root = this.document.documentElement;
    
    // We only need to swap colors, as coreTokens are brand-agnostic
    this.applyTokens(root, 'color', brandColors[brand]);
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
