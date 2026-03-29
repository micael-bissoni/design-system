import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type DataGridRecord, type DataGridColumn } from '../../organisms/data-grid/data-grid.types';

@Component({
  selector: 'ds-data-grid-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group">
      <!-- Mobile Card -->
      <div class="lg:hidden p-4 border-b border-gray-light/50 flex flex-col gap-3">
        @for (col of columns(); track col.id) {
          <div class="flex justify-between items-start gap-4 p-2 rounded-lg bg-gray-light/5">
            <span class="text-[10px] font-black text-gray-medium uppercase tracking-widest mt-1 whitespace-nowrap">{{ col.label }}</span>
            <div class="flex flex-col items-end text-right overflow-hidden flex-1">
              @if (col.cellComponent) {
                <ng-container *ngComponentOutlet="col.cellComponent; inputs: getCellInputs(col)" />
              } @else {
                <span 
                  class="text-sm font-medium text-gray-dark truncate w-full"
                  [class.text-[10px]]="col.id === 'id' || col.key === 'id'"
                  [class.font-mono]="col.id === 'id' || col.key === 'id'"
                  [class.text-gray-medium]="col.id === 'id' || col.key === 'id'"
                >
                  {{ getValue(col) }}
                </span>
              }
            </div>
          </div>
        }
      </div>

      <!-- Desktop Row -->
      <div 
        class="hidden lg:grid items-center border-b border-gray-light/50 hover:bg-gray-light/30 transition-colors h-[72px]"
        [style.grid-template-columns]="gridTemplateColumns()"
      >
        @for (col of columns(); track col.id) {
          <div 
            class="px-6 py-4 flex flex-col justify-center h-full overflow-hidden"
            [class.text-center]="col.align === 'center'"
            [class.text-right]="col.align === 'right'"
          >
            @if (col.cellComponent) {
              <ng-container *ngComponentOutlet="col.cellComponent; inputs: getCellInputs(col)" />
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridRowComponent {
  record = input.required<DataGridRecord>();
  columns = input<DataGridColumn[]>([]);
  gridTemplateColumns = input<string>('');

  getValue(col: DataGridColumn): any {
    if (col.key) return (this.record() as any)[col.key];
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


