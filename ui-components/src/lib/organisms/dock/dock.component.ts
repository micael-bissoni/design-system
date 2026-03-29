import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-dock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-lg z-[100]">
      <div 
        class="bg-white/95 backdrop-blur-xl rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-white p-2 flex items-center relative h-20"
      >
        <div class="flex-1 flex justify-around items-center px-4">
          <ng-content select="[navigation]"></ng-content>
        </div>

        <div class="flex items-center gap-2 pr-2 h-full">
          @if (selectedCount() === 0) {
            <button 
              type="button"
              data-testid="dock-add-button"
              (click)="addSelected.emit()"
              class="w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center active:scale-90 transition-all hover:opacity-90"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="3" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          } @else {
            <div 
              data-testid="dock-action-group"
              class="flex items-center gap-2 relative bg-gray-light p-1.5 rounded-full border border-gray-light/50 animate-slide-in"
            >
              <div 
                data-testid="dock-counter"
                class="absolute -top-4 -right-1 bg-black text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xl border-2 border-white z-10 animate-bounce"
              >
                {{ selectedCount() }}
              </div>
              <button 
                type="button"
                data-testid="dock-edit-button"
                (click)="editSelected.emit()"
                class="w-11 h-11 bg-white text-gray-dark rounded-full shadow-sm flex items-center justify-center active:scale-90 transition-all border border-gray-light hover:bg-gray-light"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
              <button 
                type="button"
                (click)="deleteSelected.emit()"
                data-testid="dock-delete-button"
                class="w-11 h-11 bg-danger text-on-danger rounded-full shadow-md flex items-center justify-center active:scale-90 transition-all hover:opacity-90"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockComponent {
  selectedCount = input<number>(0);

  deleteSelected = output<void>();
  addSelected = output<void>();
  editSelected = output<void>();
}
