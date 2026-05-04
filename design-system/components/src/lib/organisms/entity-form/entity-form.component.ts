import { ChangeDetectionStrategy, Component, inject, DestroyRef, output, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { InputComponent } from '../../atoms/input/input.component';
import { SelectComponent, type SelectOption } from '../../atoms/select/select.component';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { FileUploadComponent } from '../../molecules/file-upload/file-upload.component';
import { AutocompleteComponent } from '../../molecules/autocomplete/autocomplete.component';
import { type EntityData } from './entity-form.types';
import { vatValidator } from './vat.validator';

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
    FormFieldComponent,
    FileUploadComponent,
    AutocompleteComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityFormComponent),
      multi: true,
    }
  ],
  template: `
    <div [formGroup]="entityForm" class="relative p-8 rounded-3xl">
      <div class="space-y-12 relative z-10">
        <!-- Section: Identificação Base -->
        <section class="space-y-8">


          <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div class="md:col-span-3 flex flex-col items-center justify-center">
              <ds-file-upload 
                formControlName="logo"
                label="organisms.entityForm.fields.logo"
                hint="organisms.entityForm.hints.logoFormat"
              ></ds-file-upload>
            </div>

            <div class="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
              <ds-form-field label="organisms.entityForm.fields.parentId" [error]="getControlError('parentId')">
                <ds-autocomplete 
                  formControlName="parentId" 
                  [options]="parentOptions"
                  placeholder="organisms.entityForm.placeholders.parentId"
                ></ds-autocomplete>
              </ds-form-field>

              <ds-form-field label="organisms.entityForm.fields.eik" [required]="true" [error]="getControlError('eik')">
                <ds-input formControlName="eik" placeholder="organisms.entityForm.placeholders.eik"></ds-input>
              </ds-form-field>

              <ds-form-field label="organisms.entityForm.fields.type" [required]="true" [error]="getControlError('type')">
                <ds-select [options]="entityTypeOptions" formControlName="type" placeholder="organisms.entityForm.placeholders.type"></ds-select>
              </ds-form-field>

              <ds-form-field label="organisms.entityForm.fields.name" [required]="true" [error]="getControlError('name')">
                <ds-input formControlName="name" placeholder="organisms.entityForm.placeholders.name"></ds-input>
              </ds-form-field>

              <ds-form-field label="organisms.entityForm.fields.abbreviation" [required]="true" [error]="getControlError('abbreviation')">
                <ds-input formControlName="abbreviation" placeholder="organisms.entityForm.placeholders.abbreviation"></ds-input>
              </ds-form-field>

              <ds-form-field label="organisms.entityForm.fields.vat" [required]="true" [error]="getControlError('vat')">
                <ds-input formControlName="vat" placeholder="organisms.entityForm.placeholders.vat"></ds-input>
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
export class EntityFormComponent implements ControlValueAccessor, OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  /**
   * Outputs for parent interaction
   */
  onSave = output<EntityData>();
  onCancel = output<void>();

  /**
   * Options for selects (Input Decorator)
   */
  @Input() entityTypeOptions: SelectOption[] = [];
  @Input() parentOptions: SelectOption[] = [];

  /**
   * Typed Reactive Form following the flat EntityData structure
   */
  entityForm = this.fb.group({
    eik: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
    type: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    abbreviation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    vat: ['', [vatValidator(this.translate.currentLang || 'pt-PT')]],
    isActive: [{ value: false, disabled: true }],
    parentId: [''],
    logo: ['']
  });

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

    // Update VAT validator on language change
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.updateVatValidators(event.lang);
      });

    // Update VAT validator on parentId change
    this.entityForm.get('parentId')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateVatValidators(this.translate.currentLang || 'pt-PT');
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Logic for parentOptions updates if needed
  }

  private updateVatValidators(lang: string): void {
    const vatControl = this.entityForm.get('vat');
    const parentId = this.entityForm.get('parentId')?.value;
    if (vatControl) {
      const validators = [vatValidator(lang)];
      if (!parentId) {
        validators.push(Validators.required);
      }
      vatControl.setValidators(validators);
      vatControl.updateValueAndValidity();
    }
  }

  /**
   * Helper to get translated error messages
   */
  getControlError(path: string): string {
    const control = this.entityForm.get(path);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'organisms.entityForm.errors.required';
      if (control.errors?.['pattern']) return 'organisms.entityForm.errors.pattern';
      if (control.errors?.['vatInvalid']) return 'organisms.entityForm.errors.vatInvalid';
      if (control.errors?.['minlength']) return 'organisms.entityForm.errors.minLength';
      if (control.errors?.['maxlength']) return 'organisms.entityForm.errors.maxLength';
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
      this.entityForm.reset({ isActive: { value: false, disabled: true } }, { emitEvent: false });
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
