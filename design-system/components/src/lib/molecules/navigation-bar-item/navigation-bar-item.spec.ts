import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DockNavItemComponent } from './dock-nav-item.component';
import { vi } from 'vitest';

describe('DockNavItemComponent', () => {
  let component: DockNavItemComponent;
  let fixture: ComponentFixture<DockNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DockNavItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DockNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply active classes and show badge when active is true', () => {
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const badge = fixture.nativeElement.querySelector('.bg-primary.rounded-full');

    expect(button.className).toContain('text-primary');
    expect(badge).toBeTruthy();
  });

  it('should apply inactive classes and hide badge when active is false', () => {
    fixture.componentRef.setInput('active', false);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const badge = fixture.nativeElement.querySelector('.bg-primary.rounded-full');

    expect(button.className).toContain('text-gray-medium');
    expect(badge).toBeFalsy();
  });

  it('should emit select event when clicked', () => {
    const spy = vi.spyOn(component.select, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });
});
