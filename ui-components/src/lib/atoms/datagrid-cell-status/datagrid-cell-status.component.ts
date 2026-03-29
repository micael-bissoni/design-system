import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'ds-datagrid-cell-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BadgeComponent],
  template: `
    <div class="flex flex-col">
      @if (editMode() && control()) {
        <select [formControl]="control()!" class="form-select text-xs px-2 py-1 rounded-md border border-gray-light bg-white focus:outline-none focus:ring-1 focus:ring-primary">
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Pendente">Pendente</option>
          <option value="Rejeitado">Rejeitado</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Erro">Erro</option>
        </select>
      } @else {
        <ds-badge [intent]="intent()">{{ control()?.value || status() }}</ds-badge>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridCellStatusComponent {
  status = input<string>('');
  editMode = input<boolean>(false);
  control = input<FormControl<string | null>>();
  
  intent = () => {
    const s = (this.control()?.value || this.status()).toLowerCase();
    if (s.includes('sucedido') || s.includes('ativo') || s.includes('sucesso') || s.includes('active')) return 'success';
    if (s.includes('pendente') || s.includes('waiting')) return 'warning';
    if (s.includes('cancelado') || s.includes('erro') || s.includes('error') || s.includes('inactive') || s.includes('rejeitado')) return 'danger';
    return 'neutral';
  }
}
