import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buttonVariants, type ButtonVariants } from './button.variants';
import { cn } from '../../utils/cn';

@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="calculatedClass"
      [disabled]="disabled()"
      role="button"
    >
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  intent = input<ButtonVariants['intent']>('primary');
  size = input<ButtonVariants['size']>('medium');
  fullWidth = input<ButtonVariants['fullWidth']>(false);
  disabled = input<boolean>(false);

  class = input<string>('');

  get calculatedClass(): string {
    return cn(buttonVariants({ intent: this.intent(), size: this.size(), fullWidth: this.fullWidth() }), this.class());
  }
}

