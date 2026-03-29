import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'ds-datagrid-cell-mercado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  template: `
    <div class="flex flex-col w-full min-w-[100px]">
      @if (editMode() && control()) {
        <ds-input [formControl]="control()!" placeholder="Country" />
      } @else {
        <div class="text-xs font-black text-gray-medium uppercase truncate">
          {{ control()?.value || pais() }}
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridCellMercadoComponent {
  pais = input<string>('');
  editMode = input<boolean>(false);
  control = input<FormControl<string | null>>();
}
