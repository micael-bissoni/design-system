import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms';

@Component({
  selector: 'ds-data-grid-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <header class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl lg:text-3xl font-black text-gray-dark tracking-tight">{{ title() }}</h1>
        <p class="text-gray-medium font-medium italic text-xs">{{ subtitle() }}</p>
      </div>
      @if (actionLabel()) {
        <button 
          ds-button
          intent="primary"
          class="rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 self-start lg:self-auto"
          (click)="actionClicked.emit()"
        >
          <svg class="w-5 h-5 text-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="3" d="M12 4v16m8-8H4"></path>
          </svg>
          <span class="text-[10px] uppercase font-black tracking-widest text-on-primary">{{ actionLabel() }}</span>
        </button>
      }
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
  actionLabel = input<string>('');
  
  actionClicked = output<void>();
}
