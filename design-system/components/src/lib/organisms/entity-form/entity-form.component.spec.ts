import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';
import { EntityFormComponent } from './entity-form.component';
import { type EntityData } from './entity-form.types';

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

  it('should validate NIF with custom algorithm', () => {
    const nifControl = component.entityForm.get('nif');
    
    // Invalid length
    nifControl?.setValue('123');
    expect(nifControl?.valid).toBe(false);
    
    // Invalid check digit (hypothetical)
    nifControl?.setValue('123456789');
    expect(nifControl?.errors?.['nifInvalid']).toBeTruthy();
    
    // Valid Portuguese NIF (Consumer)
    nifControl?.setValue('253634020'); 
    expect(nifControl?.valid).toBe(true);
  });

  it('should emit onSave when form is valid', () => {
    const spy = vi.spyOn(component.onSave, 'emit');
    
    const validData: EntityData = {
      eik: 'EIK123',
      type: 'Farmácia',
      name: 'Farmácia Central',
      nif: '253634020',
      isActive: true,
      logo: 'logo.png'
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
