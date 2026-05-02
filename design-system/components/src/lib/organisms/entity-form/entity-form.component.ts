import { ChangeDetectionStrategy, Component, inject, DestroyRef, output, input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

import { InputComponent } from '../../atoms/input/input.component';
import { SelectComponent, type SelectOption } from '../../atoms/select/select.component';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { type EntityData, type EntityType } from './entity-form.types';

/**
 * Organism: EntityFormComponent
 * 
 * A comprehensive form for managing healthcare entity data, following Atomic Design.
 * Features a flat data structure for core identity information.
 */
@Component({
  selector: 'ds-entity-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    ButtonComponent,
    FormFieldComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityFormComponent),
      multi: true,
    }
  ],
  template: `
    <div [formGroup]="entityForm" class="relative overflow-hidden p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <!-- Decorative background element -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

      <div class="space-y-12 relative z-10">
        <!-- Section: Identificação Base -->
        <section class="space-y-8">
          <div class="flex items-center gap-6">
            <div class="h-10 w-2 bg-gradient-to-b from-primary to-primary-dark rounded-full shadow-lg shadow-primary/20"></div>
            <div>
              <h3 class="text-2xl font-black uppercase tracking-[0.2em] text-gray-900 leading-none mb-1">
                {{ 'organisms.entityForm.sections.identification' | translate }}
              </h3>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-widest">
                {{ 'organisms.entityForm.sections.identificationSubtitle' | translate | default: 'Base Identity Information' }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
            <!-- Logo Upload Placeholder / Preview -->
            <div class="md:col-span-3 flex flex-col items-center justify-center space-y-4">
              <div class="w-32 h-32 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all hover:border-primary group cursor-pointer">
                <ng-container *ngIf="entityForm.get('logo')?.value; else noLogo">
                  <img [src]="entityForm.get('logo')?.value" class="w-full h-full object-cover" />
                </ng-container>
                <ng-template #noLogo>
                  <div class="text-gray-400 group-hover:text-primary flex flex-col items-center">
                    <span class="text-2xl mb-1">⊕</span>
                    <span class="text-[10px] font-bold uppercase tracking-tighter">{{ 'organisms.entityForm.fields.logo' | translate }}</span>
                  </div>
                </ng-template>
              </div>
              <p class="text-[10px] text-gray-400 font-medium uppercase">{{ 'organisms.entityForm.hints.logoFormat' | translate | default: 'PNG, JPG max 2MB' }}</p>
            </div>

            <div class="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
              <ds-form-field label="organisms.entityForm.fields.eik" [required]="true" [error]="getControlError('eik')">
                <ds-input formControlName="eik" placeholder="organisms.entityForm.placeholders.eik"></ds-input>
              </ds-form-field>

              <ds-form-field label="organisms.entityForm.fields.type" [required]="true" [error]="getControlError('type')">
                <ds-select [options]="entityTypeOptions" formControlName="type" placeholder="organisms.entityForm.placeholders.type"></ds-select>
              </ds-form-field>

              <ds-form-field label="organisms.entityForm.fields.name" [required]="true" [error]="getControlError('name')" class="md:col-span-2">
                <ds-input formControlName="name" placeholder="organisms.entityForm.placeholders.name"></ds-input>
              </ds-form-field>

              <ds-form-field label="organisms.entityForm.fields.nif" [required]="true" [error]="getControlError('nif')">
                <ds-input formControlName="nif" placeholder="organisms.entityForm.placeholders.nif"></ds-input>
              </ds-form-field>

              <div class="flex items-center pt-8">
                <ds-checkbox formControlName="isActive" label="organisms.entityForm.fields.isActive"></ds-checkbox>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer Actions -->
        <div class="pt-10 flex justify-end items-center gap-6">
          <ds-button intent="ghost" size="large" (click)="onCancel.emit()" class="text-gray-400 hover:text-gray-900 transition-colors">
            {{ 'common.cancel' | translate }}
          </ds-button>
          <ds-button (click)="submit()" [disabled]="entityForm.invalid" size="large" class="shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            {{ 'common.save' | translate }}
          </ds-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityFormComponent implements ControlValueAccessor {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Outputs for parent interaction
   */
  onSave = output<EntityData>();
  onCancel = output<void>();

  /**
   * Typed Reactive Form following the flat EntityData structure
   */
  entityForm = this.fb.group({
    eik: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
    type: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    nif: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/), this.nifValidator]],
    isActive: [true],
    logo: ['']
  });

  /**
   * Options for selects
   */
  entityTypeOptions: SelectOption[] = [
    { label: 'organisms.entityForm.types.lab', value: 'Laboratório' },
    { label: 'organisms.entityForm.types.ware', value: 'Armazenista' },
    { label: 'organisms.entityForm.types.pharm', value: 'Farmácia' }
  ];

  /**
   * ControlValueAccessor implementation
   */
  onChange: (value: EntityData) => void = () => { };
  onTouched: () => void = () => { };

  constructor() {
    // Sync form changes with ControlValueAccessor
    this.entityForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.entityForm.valid) {
          this.onChange(this.entityForm.getRawValue() as EntityData);
        }
      });
  }

  /**
   * Custom validator for Portuguese NIF
   */
  private nifValidator(control: AbstractControl): ValidationErrors | null {
    const nif = control.value;
    if (!nif || !/^[0-9]{9}$/.test(nif)) return null;

    const added = nif[0] * 9 + nif[1] * 8 + nif[2] * 7 + nif[3] * 6 + nif[4] * 5 + nif[5] * 4 + nif[6] * 3 + nif[7] * 2;
    const res = added % 11;
    const checkDigit = res < 2 ? 0 : 11 - res;

    return checkDigit === Number(nif[8]) ? null : { nifInvalid: true };
  }

  /**
   * Helper to get translated error messages
   */
  getControlError(path: string): string {
    const control = this.entityForm.get(path);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'organisms.entityForm.errors.required';
      if (control.errors?.['pattern']) return 'organisms.entityForm.errors.pattern';
      if (control.errors?.['nifInvalid']) return 'organisms.entityForm.errors.nifInvalid';
      if (control.errors?.['minlength']) return 'organisms.entityForm.errors.minLength';
      return 'organisms.entityForm.errors.invalid';
    }
    return '';
  }

  /**
   * Emits the form value if valid
   */
  submit(): void {
    if (this.entityForm.valid) {
      this.onSave.emit(this.entityForm.getRawValue() as EntityData);
    } else {
      this.entityForm.markAllAsTouched();
    }
  }

  // ControlValueAccessor Interface
  writeValue(value: EntityData | null): void {
    if (value) {
      this.entityForm.patchValue(value, { emitEvent: false });
    } else {
      this.entityForm.reset({ isActive: true }, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: EntityData) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.entityForm.disable() : this.entityForm.enable();
  }
}
