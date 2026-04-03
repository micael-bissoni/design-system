import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar.component';
import { InputComponent } from '../../atoms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, InputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work with formControl', () => {
    const control = new FormControl('initial');
    
    // Write value
    component.writeValue('new value');
    fixture.detectChanges();
    
    const inputElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(inputElement.value).toBe('new value');

    // Change value from UI
    let changedValue = '';
    component.registerOnChange((v: string) => changedValue = v);
    inputElement.value = 'ui value';
    inputElement.dispatchEvent(new Event('input'));
    expect(changedValue).toBe('ui value');

    // Register touched
    let isTouched = false;
    component.registerOnTouched(() => isTouched = true);
    inputElement.dispatchEvent(new Event('blur'));
    expect(isTouched).toBe(true);

    // Disable state
    component.setDisabledState?.(true);
    fixture.detectChanges();
    expect(inputElement.disabled).toBe(true);
  });
});
