import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { describe, beforeEach, it, expect, afterEach } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardLayoutComponent, 
        TranslateModule.forRoot(), 
        NoopAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    
    // Set required inputs
    fixture.componentRef.setInput('navigationItems', []);
    
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle selectedCount correctly', () => {
    expect(component.selectedCount()).toBe(0);
    fixture.componentRef.setInput('selectedCount', 5);
    fixture.detectChanges();
    expect(component.selectedCount()).toBe(5);
  });
});
