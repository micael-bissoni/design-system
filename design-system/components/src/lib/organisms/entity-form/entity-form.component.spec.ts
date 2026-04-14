import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';
import { EntityFormComponent } from './entity-form.component';

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
    expect(component.entityForm.get('identification.isActive')?.value).toBe(true);
  });

  it('should validate EIK as mandatory', () => {
    const eikControl = component.entityForm.get('identification.eik');
    eikControl?.setValue('');
    expect(eikControl?.valid).toBe(false);
    expect(eikControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate NIF length', () => {
    const nifControl = component.entityForm.get('identification.nif');
    nifControl?.setValue('123');
    expect(nifControl?.valid).toBe(false);
    nifControl?.setValue('123456789');
    expect(nifControl?.valid).toBe(true);
  });

  it('should validate Email format', () => {
    const emailControl = component.entityForm.get('contactAndLocation.email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBe(false);
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBe(true);
  });

  it('should emit onSave when form is valid', () => {
    const spy = vi.spyOn(component.onSave, 'emit');
    
    component.entityForm.patchValue({
      identification: {
        eik: 'EIK123',
        type: 'Farmácia',
        name: 'Farmácia Central',
        nif: '123456789',
        isActive: true
      },
      contactAndLocation: {
        email: 'contato@farmacia.com',
        phone: '912345678',
        contactPerson: 'João Silva',
        address: 'Rua Principal, 1',
        postalCode: '1234-567',
        district: 'Lisboa',
        county: 'Lisboa'
      }
    });

    component.submit();
    expect(spy).toHaveBeenCalled();
  });
});
