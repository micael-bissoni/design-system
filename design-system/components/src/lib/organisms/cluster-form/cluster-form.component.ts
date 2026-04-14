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
import { CheckboxGroupComponent } from '../../molecules/checkbox-group/checkbox-group.component';
import { type ClusterData } from '../master-data.types';

@Component({
  selector: 'ds-cluster-form',
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
    FormFieldComponent,
    CheckboxGroupComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClusterFormComponent),
      multi: true,
    }
  ],
  template: `
    <div [formGroup]="clusterForm" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ds-form-field label="organisms.clusterForm.fields.name" [required]="true" [error]="getControlError('name')">
          <ds-input formControlName="name" placeholder="organisms.clusterForm.placeholders.name"></ds-input>
        </ds-form-field>

        <ds-form-field label="organisms.clusterForm.fields.type" [required]="true" [error]="getControlError('type')">
          <ds-select [options]="clusterTypeOptions" formControlName="type" placeholder="organisms.clusterForm.placeholders.type"></ds-select>
        </ds-form-field>

        <ds-form-field label="organisms.clusterForm.fields.segmentationCriteria" class="md:col-span-2" [error]="getControlError('segmentationCriteria')">
          <ds-textarea formControlName="segmentationCriteria" placeholder="organisms.clusterForm.placeholders.criteria"></ds-textarea>
        </ds-form-field>

        <ds-form-field label="organisms.clusterForm.fields.associatedEntities" class="md:col-span-2">
          <div class="p-4 bg-gray-light/10 rounded-2xl border border-gray-light max-h-60 overflow-y-auto custom-scrollbar">
            <ds-checkbox-group 
              [options]="entityOptions()" 
              formControlName="associatedEntityIds"
            ></ds-checkbox-group>
          </div>
        </ds-form-field>

        <div class="flex items-center pt-4">
          <ds-checkbox formControlName="isActive" label="organisms.clusterForm.fields.isActive"></ds-checkbox>
        </div>
      </div>

      <div class="pt-8 flex justify-end gap-4">
        <ds-button intent="ghost" (click)="onCancel.emit()">
          {{ 'organisms.clusterForm.cancelBtn' | translate }}
        </ds-button>
        <ds-button (click)="submit()" [disabled]="clusterForm.invalid || isSubmitting()" intent="primary">
          @if (isSubmitting()) {
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{{ 'organisms.clusterForm.loadingBtn' | translate }}</span>
            </div>
          } @else {
            {{ 'organisms.clusterForm.saveBtn' | translate }}
          }
        </ds-button>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-gray-light); border-radius: 10px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterFormComponent implements ControlValueAccessor {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  entityOptions = input<string[]>([]);
  isSubmitting = input(false);

  onSave = output<ClusterData>();
  onCancel = output<void>();

  clusterForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    segmentationCriteria: [''],
    associatedEntityIds: [new Set<string>()],
    isActive: [true]
  });

  clusterTypeOptions: SelectOption[] = [
    { label: 'organisms.clusterForm.types.commercial', value: 'Comercial' },
    { label: 'organisms.clusterForm.types.financial', value: 'Financeiro' },
    { label: 'organisms.clusterForm.types.logistic', value: 'Logístico' }
  ];

  onChange: (value: ClusterData) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    this.clusterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        // Convert Set back to array for the model if necessary, 
        // but ds-checkbox-group uses Set.
        const modelValue = {
          ...val,
          associatedEntityIds: Array.from(val.associatedEntityIds || [])
        };
        this.onChange(modelValue);
      });
  }

  getControlError(path: string): string {
    const control = this.clusterForm.get(path);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'organisms.clusterForm.errors.required';
      return 'organisms.clusterForm.errors.invalid';
    }
    return '';
  }

  submit(): void {
    if (this.clusterForm.valid) {
      const val = this.clusterForm.value;
      this.onSave.emit({
        ...val,
        associatedEntityIds: Array.from(val.associatedEntityIds || [])
      });
    } else {
      this.clusterForm.markAllAsTouched();
    }
  }

  // ControlValueAccessor
  writeValue(value: ClusterData): void {
    if (value) {
      this.clusterForm.patchValue({
        ...value,
        associatedEntityIds: new Set(value.associatedEntityIds)
      }, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: ClusterData) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.clusterForm.disable() : this.clusterForm.enable();
  }
}
