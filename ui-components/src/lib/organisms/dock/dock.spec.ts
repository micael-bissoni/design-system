import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DockComponent } from './dock.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <ds-dock [selectedCount]="count">
      <div navigation>Test Navigation</div>
    </ds-dock>
  `,
  standalone: true,
  imports: [DockComponent],
})
class TestHostComponent {
  count = 0;
}

describe('DockComponent', () => {
  let component: DockComponent;
  let fixture: ComponentFixture<DockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the add button when selectedCount is 0', () => {
    fixture.componentRef.setInput('selectedCount', 0);
    fixture.detectChanges();

    const addButton = fixture.nativeElement.querySelector('[data-testid="dock-add-button"]');
    const actionContainer = fixture.nativeElement.querySelector('[data-testid="dock-action-group"]');

    expect(addButton).toBeTruthy();
    expect(actionContainer).toBeFalsy();
  });

  it('should show the action group (Edit/Delete) and counter when selectedCount > 0', () => {
    fixture.componentRef.setInput('selectedCount', 5);
    fixture.detectChanges();

    const addButton = fixture.nativeElement.querySelector('[data-testid="dock-add-button"]');
    const actionContainer = fixture.nativeElement.querySelector('[data-testid="dock-action-group"]');
    const counter = fixture.nativeElement.querySelector('[data-testid="dock-counter"]');

    expect(addButton).toBeFalsy();
    expect(actionContainer).toBeTruthy();
    expect(counter?.textContent).toContain('5');
  });

  it('should emit deleteSelected when the delete button is clicked', () => {
    const spy = vi.spyOn(component.deleteSelected, 'emit');
    fixture.componentRef.setInput('selectedCount', 1);
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('[data-testid="dock-delete-button"]');
    deleteButton.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should render projected navigation', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    
    expect(hostFixture.nativeElement.textContent).toContain('Test Navigation');
  });
});
