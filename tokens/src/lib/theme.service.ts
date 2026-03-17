import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { designTokens } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  /**
   * Translates TS tokens into native CSS variables at the :root level
   */
  public initializeTokens(): void {
    const root = this.document.documentElement;
    
    this.applyTokens(root, 'color', designTokens.color);
    this.applyTokens(root, 'spacing', designTokens.spacing);
    this.applyTokens(root, 'font-family', designTokens.font.family);
    this.applyTokens(root, 'font-size', designTokens.font.size);
    this.applyTokens(root, 'font-weight', designTokens.font.weight);
    this.applyTokens(root, 'radius', designTokens.radius);
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
