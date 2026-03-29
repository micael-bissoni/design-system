import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-data-grid-designation-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col">
      <span class="text-[9px] font-mono text-gray-medium">{{ id() }}</span>
      <span class="font-bold text-gray-dark truncate max-w-[300px]">{{ name() }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignationCellComponent {
  id = input<string>('');
  name = input<string>('');
}
