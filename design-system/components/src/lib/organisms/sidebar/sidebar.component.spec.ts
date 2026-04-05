import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll, vi } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { IconComponent } from '../../atoms/icon/icon.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const items = [
    { id: '1', label: 'Dashboard', icon: 'dashboard', active: true },
    { id: '2', label: 'Users', icon: 'users', active: false },
  ];

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, IconComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render items', () => {
    const renderedItems = fixture.nativeElement.querySelectorAll('[data-testid="sidebar-item"]');
    expect(renderedItems.length).toBe(2);
  });

  it('should emit itemSelected when an item is clicked', () => {
    const emitSpy = vi.spyOn(component.itemSelected, 'emit');
    const firstItem = fixture.nativeElement.querySelector('[data-testid="sidebar-item"]');
    firstItem.click();
    expect(emitSpy).toHaveBeenCalledWith(items[0]);
  });

  it('should emit toggle when collapse button is clicked', () => {
    const emitSpy = vi.spyOn(component.toggle, 'emit');
    const toggleBtn = fixture.nativeElement.querySelector('[data-testid="sidebar-toggle"]');
    toggleBtn.click();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });
});
