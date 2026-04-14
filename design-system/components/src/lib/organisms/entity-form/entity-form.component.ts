import { ChangeDetectionStrategy, Component, inject, DestroyRef, output, input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { InputComponent } from '../../atoms/input/input.component';
import { SelectComponent, type SelectOption } from '../../atoms/select/select.component';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { type EntityData, type EntityType } from '../master-data.types';

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
    <div [formGroup]="entityForm" class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <!-- Section A: Identificação Base -->
      <section class="space-y-6">
        <div class="flex items-center gap-4 mb-8">
          <div class="h-8 w-1.5 bg-primary rounded-full"></div>
          <h3 class="text-xl font-black uppercase tracking-widest text-gray-dark">
            {{ 'organisms.entityForm.sections.identification' | translate }}
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" formGroupName="identification">
          <ds-form-field label="organisms.entityForm.fields.eik" [required]="true" [error]="getControlError('identification.eik')">
            <ds-input formControlName="eik" placeholder="organisms.entityForm.placeholders.eik"></ds-input>
          </ds-form-field>

          <ds-form-field label="organisms.entityForm.fields.type" [required]="true" [error]="getControlError('identification.type')">
            <ds-select [options]="entityTypeOptions" formControlName="type" placeholder="organisms.entityForm.placeholders.type"></ds-select>
          </ds-form-field>

          <ds-form-field label="organisms.entityForm.fields.name" [required]="true" [error]="getControlError('identification.name')" class="md:col-span-2">
            <ds-input formControlName="name" placeholder="organisms.entityForm.placeholders.name"></ds-input>
          </ds-form-field>

          <ds-form-field label="organisms.entityForm.fields.nif" [required]="true" [error]="getControlError('identification.nif')">
            <ds-input formControlName="nif" placeholder="organisms.entityForm.placeholders.nif"></ds-input>
          </ds-form-field>

          <div class="flex items-center pt-8">
            <ds-checkbox formControlName="isActive" label="organisms.entityForm.fields.isActive"></ds-checkbox>
          </div>
        </div>
      </section>

      <!-- Section B: Contactos e Localização -->
      <section class="space-y-6">
        <div class="flex items-center gap-4 mb-8">
          <div class="h-8 w-1.5 bg-secondary rounded-full"></div>
          <h3 class="text-xl font-black uppercase tracking-widest text-gray-dark">
            {{ 'organisms.entityForm.sections.contactAndLocation' | translate }}
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" formGroupName="contactAndLocation">
          <ds-form-field label="organisms.entityForm.fields.email" [required]="true" [error]="getControlError('contactAndLocation.email')">
            <ds-input type="email" formControlName="email" placeholder="organisms.entityForm.placeholders.email"></ds-input>
          </ds-form-field>

          <ds-form-field label="organisms.entityForm.fields.phone" [error]="getControlError('contactAndLocation.phone')">
            <ds-input formControlName="phone" placeholder="organisms.entityForm.placeholders.phone"></ds-input>
          </ds-form-field>

          <ds-form-field label="organisms.entityForm.fields.contactPerson" [error]="getControlError('contactAndLocation.contactPerson')">
            <ds-input formControlName="contactPerson" placeholder="organisms.entityForm.placeholders.contactPerson"></ds-input>
          </ds-form-field>

          <ds-form-field label="organisms.entityForm.fields.address" class="md:col-span-2" [error]="getControlError('contactAndLocation.address')">
            <ds-input formControlName="address" placeholder="organisms.entityForm.placeholders.address"></ds-input>
          </ds-form-field>

          <ds-form-field label="organisms.entityForm.fields.postalCode" [error]="getControlError('contactAndLocation.postalCode')">
            <ds-input formControlName="postalCode" placeholder="organisms.entityForm.placeholders.postalCode"></ds-input>
          </ds-form-field>

          <ds-form-field label="organisms.entityForm.fields.district" [error]="getControlError('contactAndLocation.district')">
            <ds-select [options]="districtOptions" formControlName="district" placeholder="organisms.entityForm.placeholders.district"></ds-select>
          </ds-form-field>

          <ds-form-field label="organisms.entityForm.fields.county" [error]="getControlError('contactAndLocation.county')">
            <ds-select [options]="countyOptions" formControlName="county" placeholder="organisms.entityForm.placeholders.county"></ds-select>
          </ds-form-field>
        </div>
      </section>

      <div class="pt-10 flex justify-end gap-4">
        <ds-button intent="ghost" (click)="onCancel.emit()">
          {{ 'common.cancel' | translate }}
        </ds-button>
        <ds-button (click)="submit()" [disabled]="entityForm.invalid">
          {{ 'common.save' | translate }}
        </ds-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityFormComponent implements ControlValueAccessor {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  onSave = output<EntityData>();
  onCancel = output<void>();

  entityForm: FormGroup = this.fb.group({
    identification: this.fb.group({
      eik: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
      type: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      nif: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/), this.nifValidator]],
      isActive: [true]
    }),
    contactAndLocation: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9\s+]+$/)]],
      contactPerson: [''],
      address: [''],
      postalCode: ['', [Validators.pattern(/^[0-9]{4}-[0-9]{3}$/)]],
      district: [''],
      county: ['']
    })
  });

  entityTypeOptions: SelectOption[] = [
    { label: 'organisms.entityForm.types.lab', value: 'Laboratório' },
    { label: 'organisms.entityForm.types.ware', value: 'Armazenista' },
    { label: 'organisms.entityForm.types.pharm', value: 'Farmácia' }
  ];

  districtOptions: SelectOption[] = []; // Sincronizados com regionalização
  countyOptions: SelectOption[] = [];

  onChange: (value: EntityData) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    this.entityForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        this.onChange(val);
      });
  }

  private nifValidator(control: AbstractControl): ValidationErrors | null {
    const nif = control.value;
    if (!nif || !/^[0-9]{9}$/.test(nif)) return null;

    const added = nif[0] * 9 + nif[1] * 8 + nif[2] * 7 + nif[3] * 6 + nif[4] * 5 + nif[5] * 4 + nif[6] * 3 + nif[7] * 2;
    const res = added % 11;
    const checkDigit = res < 2 ? 0 : 11 - res;

    return checkDigit === Number(nif[8]) ? null : { nifInvalid: true };
  }

  getControlError(path: string): string {
    const control = this.entityForm.get(path);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'organisms.entityForm.errors.required';
      if (control.errors?.['pattern']) return 'organisms.entityForm.errors.pattern';
      if (control.errors?.['email']) return 'organisms.entityForm.errors.email';
      if (control.errors?.['nifInvalid']) return 'organisms.entityForm.errors.nifInvalid';
      return 'organisms.entityForm.errors.invalid';
    }
    return '';
  }

  submit(): void {
    if (this.entityForm.valid) {
      this.onSave.emit(this.entityForm.value);
    } else {
      this.entityForm.markAllAsTouched();
    }
  }

  // ControlValueAccessor
  writeValue(value: EntityData): void {
    if (value) {
      this.entityForm.patchValue(value, { emitEvent: false });
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
