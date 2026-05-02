import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';
import { EntityFormComponent } from './entity-form.component';
import { type EntityData } from './entity-form.types';
import { type SelectOption } from '../../atoms/select/select.component';

describe('EntityFormComponent', () => {
  let component: EntityFormComponent;
  let fixture: ComponentFixture<EntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EntityFormComponent,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityFormComponent);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('entityTypeOptions', [
      { label: 'Lab', value: 'Laboratório' },
      { label: 'Pharmacy', value: 'Farmácia' }
    ]);

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.entityForm.get('isActive')?.value).toBe(true);
    expect(component.entityForm.get('logo')?.value).toBe('');
  });

  it('should validate EIK as mandatory and correct pattern', () => {
    const eikControl = component.entityForm.get('eik');
    eikControl?.setValue('');
    expect(eikControl?.valid).toBe(false);

    eikControl?.setValue('invalid eik');
    expect(eikControl?.valid).toBe(false);

    eikControl?.setValue('EIK-123');
    expect(eikControl?.valid).toBe(true);
  });

  it('should validate VAT with custom algorithm', () => {
    const vatControl = component.entityForm.get('vat');

    // Invalid length
    vatControl?.setValue('123');
    expect(vatControl?.valid).toBe(false);

    // Invalid check digit (hypothetical)
    vatControl?.setValue('123456789');
    expect(vatControl?.errors?.['vatInvalid']).toBeTruthy();

    // Valid Portuguese VAT (Consumer)
    vatControl?.setValue('253634020');
    expect(vatControl?.valid).toBe(true);
  });

  it('should emit onSave when form is valid', () => {
    const spy = vi.spyOn(component.onSave, 'emit');

    const validData: EntityData = {
      eik: 'EIK123',
      type: 'Farmácia',
      name: 'Farmácia Central',
      vat: '253634020',
      isActive: true,
      logo: 'logo.png',
      abbreviation: 'pha-cen'
    };

    component.entityForm.patchValue(validData);
    component.submit();

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      eik: 'EIK123'
    }));
  });

  it('should mark all fields as touched on invalid submit', () => {
    component.entityForm.patchValue({ eik: '' });
    component.submit();

    expect(component.entityForm.get('eik')?.touched).toBe(true);
  });
});
