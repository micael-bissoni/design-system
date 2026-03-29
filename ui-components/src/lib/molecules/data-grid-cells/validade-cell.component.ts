import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-data-grid-validade-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center text-[10px] font-mono font-bold text-gray-medium whitespace-nowrap">
      {{ dataInicio() }} • {{ dataFim() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidadeCellComponent {
  dataInicio = input<string>('');
  dataFim = input<string>('');
}
