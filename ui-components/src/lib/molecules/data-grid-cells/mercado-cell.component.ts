import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-data-grid-mercado-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-xs font-black text-gray-medium uppercase truncate">
      {{ pais() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MercadoCellComponent {
  pais = input<string>('');
}
