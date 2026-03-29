import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../atoms';

@Component({
  selector: 'ds-data-grid-status-cell',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <ds-badge [intent]="intent()">{{ status() }}</ds-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusCellComponent {
  status = input<string>('');
  
  intent = () => {
    const s = this.status().toLowerCase();
    if (s.includes('sucedido') || s.includes('ativo') || s.includes('sucesso') || s.includes('active')) return 'success';
    if (s.includes('pendente') || s.includes('waiting')) return 'warning';
    if (s.includes('cancelado') || s.includes('erro') || s.includes('error') || s.includes('inactive')) return 'danger';
    return 'neutral';
  }
}
