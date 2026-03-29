import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with correct placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Search...');
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('input');
    expect(element.placeholder).toBe('Search...');
  });

  it('should emit value when typing', () => {
    const spy = vi.spyOn(component.valueChange, 'emit');
    const element = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    element.value = 'hello';
    element.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('hello');
  });

  it('should work with formControl', () => {
    const control = new FormControl('initial');
    // We'll wrap it in a parent component to test Reactive Forms integration properly if needed,
    // but for now let's just test that it implements the interface correctly.
    
    // Write value
    component.writeValue('new value');
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(element.value).toBe('new value');

    // Change value from UI
    let changedValue = '';
    component.registerOnChange((v: string) => changedValue = v);
    element.value = 'ui value';
    element.dispatchEvent(new Event('input'));
    expect(changedValue).toBe('ui value');

    // Register touched
    let isTouched = false;
    component.registerOnTouched(() => isTouched = true);
    element.dispatchEvent(new Event('blur'));
    expect(isTouched).toBe(true);

    // Disable state
    component.setDisabledState?.(true);
    fixture.detectChanges();
    expect(element.disabled).toBe(true);
  });
});
