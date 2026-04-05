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

  it('should toggle sidebar', () => {
    expect(component.isSidebarCollapsed()).toBeFalsy();
    component.isSidebarCollapsed.set(true);
    fixture.detectChanges();
    expect(component.isSidebarCollapsed()).toBeTruthy();
  });

  it('should open mobile menu', () => {
    expect(component.isMobileMenuOpen()).toBeFalsy();
    component.isMobileMenuOpen.set(true);
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBeTruthy();
  });
});
