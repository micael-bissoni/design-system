import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type DataGridRecord, type DataGridColumn } from '../../organisms/data-grid/data-grid.types';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-data-grid-row',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="group border-b border-gray-light/50">
      <!-- Desktop Row -->
      <div 
        class="hidden lg:grid items-center hover:bg-gray-light/30 transition-colors h-[72px]"
        [style.grid-template-columns]="gridTemplateColumns()"
      >
        <!-- TOGGLE EXPAND BUTTON -->
        @if (expandable()) {
          <div class="pl-6 flex items-center h-full">
            <button 
              (click)="onToggleExpand()"
              class="p-1 rounded hover:bg-gray-light/50 transition-transform duration-200"
              [class.rotate-90]="expanded()"
            >
              <svg class="h-4 w-4 text-gray-medium group-hover:text-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        }

        @for (col of columns(); track col.id) {
          <div 
            class="px-6 py-4 flex flex-col justify-center h-full overflow-hidden"
            [class.px-2]="expandable()"
            [class.text-center]="col.align === 'center'"
            [class.text-right]="col.align === 'right'"
          >
            @if (col.cellComponent) {
              <ng-container *ngComponentOutlet="col.cellComponent || null; inputs: getCellInputs(col)" />
            } @else {
              <span 
                class="truncate text-gray-dark"
                [class.text-[9px]]="col.id === 'id' || col.key === 'id'"
                [class.font-mono]="col.id === 'id' || col.key === 'id'"
                [class.text-gray-medium]="col.id === 'id' || col.key === 'id'"
                [class.font-bold]="col.id === 'nome' || col.key === 'nome'"
              >
                {{ getValue(col) }}
              </span>
            }
          </div>
        }
      </div>

      <!-- Mobile Card -->
      <div class="lg:hidden p-4 flex flex-col gap-4 relative bg-white transition-all active:bg-gray-light/10">
        <!-- HEADER PART (First column + Toggle) -->
        <div class="flex items-center justify-between gap-4">
          <div class="flex flex-col gap-1 overflow-hidden">
            <span class="text-[9px] font-mono font-black text-gray-lightest uppercase tracking-tighter">
              #{{ record().id }}
            </span>
            <div class="truncate">
              @if (columns()[0]?.cellComponent) {
                <ng-container *ngComponentOutlet="columns()[0].cellComponent || null; inputs: getCellInputs(columns()[0])" />
              } @else {
                <span class="text-sm font-bold text-gray-dark truncate block">
                  {{ getValue(columns()[0]) }}
                </span>
              }
            </div>
          </div>

          <div class="flex items-center gap-2">
            @if (expandable()) {
              <button 
                (click)="onToggleExpand()"
                class="p-2.5 rounded-xl bg-gray-light/20 text-gray-medium transition-all"
                [class.rotate-90]="expanded()"
                [class.bg-primary-50]="expanded()"
                [class.text-primary-600]="expanded()"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            }
          </div>
        </div>

        <!-- DETAILS GRID -->
        <div class="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-gray-light/5 border border-gray-light/20">
          @for (col of columns().slice(1); track col.id) {
            <div class="flex flex-col gap-1 overflow-hidden">
              <span class="text-[8px] font-black text-gray-lightest uppercase tracking-widest">{{ col.label | translate }}</span>
              <div class="truncate">
                @if (col.cellComponent) {
                  <div class="scale-90 origin-left">
                    <ng-container *ngComponentOutlet="col.cellComponent || null; inputs: getCellInputs(col)" />
                  </div>
                } @else {
                  <span class="text-xs font-semibold text-gray-dark truncate block">
                    {{ getValue(col) }}
                  </span>
                }
              </div>
            </div>
          }
        </div>
      </div>

      <!-- EXPANDED CONTENT -->
      @if (expanded()) {
        <div class="w-full bg-gray-light/10 px-4 md:px-10 py-6 border-t border-gray-light/30">
           <div class="bg-white rounded-2xl shadow-sm border border-gray-light p-4 overflow-hidden">
              <ng-content />
           </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridRowComponent {
  record = input.required<DataGridRecord>();
  columns = input<DataGridColumn[]>([]);
  gridTemplateColumns = input<string>('');
  expandable = input<boolean>(false);
  expanded = input<boolean>(false);

  toggleExpand = output<void>();

  onToggleExpand(): void {
    this.toggleExpand.emit();
  }

  getValue(col: DataGridColumn): any {
    if (col.key) return this.record()[col.key];
    return '';
  }

  getCellInputs(col: DataGridColumn): Record<string, any> {
    if (col.cellConfig) {
      const config = col.cellConfig(this.record());
      return { ...config };
    }
    return { record: this.record() };
  }
}


