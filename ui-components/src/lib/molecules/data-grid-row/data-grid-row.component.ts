import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../atoms';
import { type DataGridRecord } from '../../organisms/data-grid/data-grid.types';

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
      <div class="hidden lg:grid grid-cols-[1fr_150px_180px_120px] items-center border-b border-gray-light/50 hover:bg-gray-light/30 transition-colors h-[72px]">
        <div class="px-6 py-4 flex flex-col">
          <span class="text-[9px] font-mono text-gray-medium">{{ record().id }}</span>
          <span class="font-bold text-gray-dark">{{ record().nome }}</span>
        </div>
        <div class="px-6 py-4 text-xs font-black text-gray-medium uppercase">{{ record().pais }}</div>
        <div class="px-6 py-4 text-center text-[10px] font-mono font-bold text-gray-medium">
          {{ record().dataInicio }} • {{ record().dataFim }}
        </div>
        <div class="px-6 py-4 text-center">
          <ds-badge [intent]="getStatusIntent(record().estado)">{{ record().estado }}</ds-badge>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridRowComponent {
  record = input.required<DataGridRecord>();

  getStatusIntent(status: string): any {
    const s = status.toLowerCase();
    if (s.includes('sucedido') || s.includes('ativo') || s.includes('sucesso') || s.includes('active')) return 'success';
    if (s.includes('pendente') || s.includes('waiting')) return 'warning';
    if (s.includes('cancelado') || s.includes('erro') || s.includes('error') || s.includes('inactive')) return 'danger';
    return 'neutral';
  }
}
