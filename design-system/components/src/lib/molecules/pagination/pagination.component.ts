import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-12 bg-white/95 backdrop-blur border-t border-gray-light flex items-center justify-start gap-4 px-6 z-20">
      <span class="text-[10px] font-mono font-black text-gray-medium uppercase tracking-tighter">
        {{ rangeLabel() }}
      </span>
      <div class="h-4 w-px bg-gray-light"></div>
      <div class="flex items-center gap-1">
        <button 
          (click)="prev.emit()" 
          [disabled]="prevDisabled()" 
          class="p-1.5 text-gray-medium hover:text-primary disabled:opacity-10 transition-all"
          data-testid="pagination-prev"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="3" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button 
          (click)="next.emit()" 
          [disabled]="nextDisabled()" 
          class="p-1.5 text-gray-medium hover:text-primary disabled:opacity-10 transition-all"
          data-testid="pagination-next"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="3" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  rangeLabel = input.required<string>();
  prevDisabled = input<boolean>(false);
  nextDisabled = input<boolean>(false);

  prev = output<void>();
  next = output<void>();
}
