import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modalVariants, type ModalVariants } from './modal.variants';
import { cn } from '../../utils/cn';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'ds-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div 
          data-testid="ds-modal-backdrop"
          class="fixed inset-0 bg-gray-dark/50 backdrop-blur-sm transition-opacity"
          (click)="handleBackdropClick()"
        ></div>

        <!-- Modal Container -->
        <div 
          data-testid="ds-modal"
          [class]="calculatedClass"
          class="relative w-full bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-light">
            <h3 class="text-xl font-semibold text-gray-dark">{{ title() }}</h3>
            <ds-button 
              data-testid="ds-modal-close"
              intent="ghost" 
              size="small" 
              shape="circle"
              (click)="close.emit()"
            >
              <ds-icon name="close" size="small"></ds-icon>
            </ds-button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <ng-content />
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-3 p-6 bg-gray-50 border-t border-gray-light">
            <ng-content select="[footer]" />
          </div>
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  size = input<ModalVariants['size']>('md');
  closeOnBackdrop = input<boolean>(true);

  close = output<void>();

  get calculatedClass(): string {
    return cn(modalVariants({ size: this.size() }));
  }

  handleBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.close.emit();
    }
  }
}
