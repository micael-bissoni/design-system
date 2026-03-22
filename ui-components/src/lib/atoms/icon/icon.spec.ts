import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('name', 'content_copy');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render with default intent and size', () => {
    fixture.componentRef.setInput('name', 'content_copy');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('[data-testid="ds-icon"]');
    expect(icon.className).toContain('bg-primary');
    expect(icon.className).toContain('w-6 h-6');
    expect(icon.style.maskImage).toContain('var(--icon-content_copy)');
  });

  it('should apply custom intent and size', () => {
    fixture.componentRef.setInput('name', 'content_paste');
    fixture.componentRef.setInput('intent', 'secondary');
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('[data-testid="ds-icon"]');
    expect(icon.className).toContain('bg-secondary');
    expect(icon.className).toContain('w-8 h-8');
    expect(icon.style.maskImage).toContain('var(--icon-content_paste)');
  });
});
