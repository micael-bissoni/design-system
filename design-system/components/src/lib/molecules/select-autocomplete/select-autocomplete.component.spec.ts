import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectAutocompleteComponent } from './select-autocomplete.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll, vi } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('SelectAutocompleteComponent', () => {
  let component: SelectAutocompleteComponent;
  let fixture: ComponentFixture<SelectAutocompleteComponent>;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAutocompleteComponent, TranslateModule.forRoot(), ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAutocompleteComponent);
    component = fixture.componentInstance;
    
    // Set required input
    fixture.componentRef.setInput('options', [
      { label: 'Portugal', value: 'PT' },
      { label: 'Spain', value: 'ES' },
    ]);
    
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show options when searching', async () => {
    component.onSearch('Por');
    fixture.detectChanges();
    
    expect(component.isOpen()).toBe(true);
    expect(component.filteredOptions()).toHaveLength(1);
    expect(component.filteredOptions()[0].label).toBe('Portugal');
  });

  it('should select an option', () => {
    const spy = vi.spyOn(component.valueChange, 'emit');
    const option = { label: 'Spain', value: 'ES' };
    
    component.onSelect(option);
    
    expect(component.internalValue()).toBe('ES');
    expect(component.searchText()).toBe('Spain');
    expect(component.isOpen()).toBe(false);
    expect(spy).toHaveBeenCalledWith('ES');
  });

  it('should filter options based on search text', () => {
    component.onSearch('s');
    fixture.detectChanges();
    
    // 'Spain' contains 's' (case insensitive), 'Portugal' does not.
    expect(component.filteredOptions()).toHaveLength(1);
    expect(component.filteredOptions()[0].value).toBe('ES');
  });

  it('should clear value when search text is empty', () => {
    component.internalValue.set('PT');
    component.onSearch('');
    
    expect(component.internalValue()).toBe('');
    expect(component.searchText()).toBe('');
  });

  it('should emit queryChange with debounce', async () => {
    const spy = vi.spyOn(component.queryChange, 'emit');
    
    component.onSearch('Portugal');
    
    // Should not emit immediately
    expect(spy).not.toHaveBeenCalled();
    
    // Wait for debounce (default 300ms)
    await new Promise(resolve => setTimeout(resolve, 350));
    
    expect(spy).toHaveBeenCalledWith('Portugal');
  });

  it('should show loading state when isLoading is true', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    
    component.isOpen.set(true);
    fixture.detectChanges();
    
    const debugElement = fixture.debugElement.nativeElement;
    const loadingElement = debugElement.querySelector('.animate-spin');
    expect(loadingElement).toBeTruthy();
  });
});
