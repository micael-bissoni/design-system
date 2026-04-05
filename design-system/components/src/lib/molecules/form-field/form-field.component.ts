import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-form-field',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="flex flex-col gap-1.5 w-full" data-testid="ds-form-field">
      @if (label()) {
        <label [for]="id()" class="text-sm font-bold text-gray-dark select-none">
          {{ label() | translate }}
          @if (required()) {
            <span class="text-danger ml-0.5" aria-hidden="true">*</span>
          }
        </label>
      }
      
      <div class="relative flex flex-col">
        <ng-content></ng-content>
      </div>

      @if (error()) {
        <span 
          class="text-xs font-medium text-danger mt-1.5 flex items-center gap-1 transition-all duration-200 animate-in fade-in slide-in-from-top-1"
          role="alert"
          data-testid="ds-form-field-error"
        >
          <span class="w-1 h-1 rounded-full bg-danger"></span>
          {{ error() | translate }}
        </span>
      } @else if (hint()) {
        <span class="text-xs text-gray-medium mt-1.5 italic" data-testid="ds-form-field-hint">
          {{ hint() | translate }}
        </span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  id = input<string>('');
  label = input<string>('');
  error = input<string>('');
  hint = input<string>('');
  required = input<boolean>(false);
}
