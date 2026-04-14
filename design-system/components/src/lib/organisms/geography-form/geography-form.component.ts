import { ChangeDetectionStrategy, Component, inject, DestroyRef, output, input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

import { InputComponent } from '../../atoms/input/input.component';
import { SelectComponent, type SelectOption } from '../../atoms/select/select.component';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { TextareaComponent } from '../../atoms/textarea/textarea.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { type GeographyData } from '../master-data.types';

@Component({
  selector: 'ds-geography-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    ButtonComponent,
    TextareaComponent,
    FormFieldComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GeographyFormComponent),
      multi: true,
    }
  ],
  template: `
    <div [formGroup]="geoForm" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ds-form-field label="organisms.geographyForm.fields.name" [required]="true" [error]="getControlError('name')">
          <ds-input formControlName="name" placeholder="organisms.geographyForm.placeholders.name"></ds-input>
        </ds-form-field>

        <ds-form-field label="organisms.geographyForm.fields.type" [required]="true" [error]="getControlError('type')">
          <ds-select [options]="geoTypeOptions" formControlName="type" placeholder="organisms.geographyForm.placeholders.type"></ds-select>
        </ds-form-field>

        <ds-form-field label="organisms.geographyForm.fields.parentRegion" [error]="getControlError('parentRegionId')">
          <ds-select [options]="parentRegionOptions" formControlName="parentRegionId" placeholder="organisms.geographyForm.placeholders.parentRegion"></ds-select>
        </ds-form-field>

        <ds-form-field label="organisms.geographyForm.fields.externalCode" [error]="getControlError('externalCode')">
          <ds-input formControlName="externalCode" placeholder="organisms.geographyForm.placeholders.externalCode"></ds-input>
        </ds-form-field>

        <ds-form-field label="organisms.geographyForm.fields.description" class="md:col-span-2" [error]="getControlError('description')">
          <ds-textarea formControlName="description" placeholder="organisms.geographyForm.placeholders.description"></ds-textarea>
        </ds-form-field>

        <div class="flex items-center pt-4">
          <ds-checkbox formControlName="isActive" label="organisms.geographyForm.fields.isActive"></ds-checkbox>
        </div>
      </div>

      <div class="pt-8 flex justify-end gap-4">
        <ds-button intent="ghost" (click)="onCancel.emit()">
          {{ 'common.cancel' | translate }}
        </ds-button>
        <ds-button (click)="submit()" [disabled]="geoForm.invalid">
          {{ 'common.save' | translate }}
        </ds-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeographyFormComponent implements ControlValueAccessor {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  onSave = output<GeographyData>();
  onCancel = output<void>();

  geoForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    parentRegionId: [''],
    externalCode: [''],
    description: [''],
    isActive: [true]
  });

  geoTypeOptions: SelectOption[] = [
    { label: 'ARS', value: 'ARS' },
    { label: 'ACES', value: 'ACES' },
    { label: 'Distrito', value: 'Distrito' },
    { label: 'Concelho', value: 'Concelho' }
  ];

  parentRegionOptions: SelectOption[] = [];

  onChange: (value: GeographyData) => void = () => { };
  onTouched: () => void = () => { };

  constructor() {
    this.geoForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        this.onChange(val);
      });
  }

  getControlError(path: string): string {
    const control = this.geoForm.get(path);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'organisms.geographyForm.errors.required';
      return 'organisms.geographyForm.errors.invalid';
    }
    return '';
  }

  submit(): void {
    if (this.geoForm.valid) {
      this.onSave.emit(this.geoForm.value);
    } else {
      this.geoForm.markAllAsTouched();
    }
  }

  // ControlValueAccessor
  writeValue(value: GeographyData): void {
    if (value) {
      this.geoForm.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: GeographyData) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.geoForm.disable() : this.geoForm.enable();
  }
}
