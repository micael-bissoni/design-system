import { ChangeDetectionStrategy, Component, effect, forwardRef, input, output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { cn } from '../../utils/cn';
import { inputVariants, type InputVariants } from './input.variants';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-input',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule],
  template: `
    <input
      [type]="type()"
      [placeholder]="placeholder() | translate"
      [value]="internalValue()"
      [disabled]="disabled()"
      (input)="onInput($event)"
      (blur)="onBlur()"
      [class]="calculatedClass"
      data-testid="ds-input"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  type = input<string>('text');
  placeholder = input<string>('');
  value = input<string>('');
  disabledInput = input<boolean>(false, { alias: 'disabled' });
  variant = input<InputVariants['variant']>('default');
  class = input<string>('');

  valueChange = output<string>();
  onBlurEvent = output<void>();

  internalValue = signal<string>('');
  disabled = signal<boolean>(false);

  constructor() {
    effect(() => {
      const val = this.value();
      untracked(() => this.internalValue.set(val || ''));
    });
    effect(() => {
      const d = this.disabledInput();
      untracked(() => this.disabled.set(d));
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => { };

  get calculatedClass(): string {
    return cn(inputVariants({ variant: this.variant() }), this.class());
  }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.internalValue.set(val);
    this.onChange(val);
    this.valueChange.emit(val);
  }

  onBlur() {
    this.onTouched();
    this.onBlurEvent.emit();
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.internalValue.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
