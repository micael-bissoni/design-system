import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../atoms';
import { type DataGridRecord, type DataGridColumn } from '../../organisms/data-grid/data-grid.types';

@Component({
  selector: 'ds-data-grid-row',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <div class="group">
      <!-- Mobile Card -->
      <div class="lg:hidden p-6 border-b border-gray-light/50 flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-mono text-gray-medium">{{ record().id }}</span>
          <ds-badge [intent]="getStatusIntent(record().estado)">{{ record().estado }}</ds-badge>
        </div>
        <h3 class="text-lg font-black text-gray-dark leading-tight">{{ record().nome }}</h3>
        <div class="flex justify-between items-center pt-2 border-t border-gray-light/50">
          <span class="text-[10px] font-black text-gray-medium uppercase tracking-widest">{{ record().pais }}</span>
          <span class="text-[10px] font-mono text-gray-medium bg-gray-light px-2 py-1 rounded-lg">
            {{ record().dataInicio }} — {{ record().dataFim }}
          </span>
        </div>
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

  getStatusIntent(status: string): any {
    const s = status.toLowerCase();
    if (s.includes('sucedido') || s.includes('ativo') || s.includes('sucesso') || s.includes('active')) return 'success';
    if (s.includes('pendente') || s.includes('waiting')) return 'warning';
    if (s.includes('cancelado') || s.includes('erro') || s.includes('error') || s.includes('inactive')) return 'danger';
    return 'neutral';
  }

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


