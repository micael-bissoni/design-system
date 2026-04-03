import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply primary intent classes by default', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('bg-primary');
    expect(button.className).toContain('text-on-primary');
  });

  it('should apply custom size classes', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('h-sm');
    expect(button.className).toContain('px-sm');
  });

  it('should apply fullWidth class when input is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('w-full');
  });
});
