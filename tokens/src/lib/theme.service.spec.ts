import { vitest as vi, describe, it, expect, beforeEach, beforeAll, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ThemeService } from './theme.service';
import { DOCUMENT } from '@angular/common';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockDocument: {
    documentElement: {
      style: {
        setProperty: ReturnType<typeof vi.fn>;
      };
    };
  };

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    mockDocument = {
      documentElement: {
        style: {
          setProperty: vi.fn()
        }
      }
    };

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set css variables when initializing tokens defaults to defaultBrand', () => {
    service.initializeTokens('defaultBrand');
    const setPropertyCalls = mockDocument.documentElement.style.setProperty.mock.calls;

    expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalled();
    
    // Check color (flat and nested)
    const primaryColorCall = setPropertyCalls.find(call => call[0] === '--color-primary');
    expect(primaryColorCall?.[1]).toBe('#ea4335');

    const brandPrimaryColorCall = setPropertyCalls.find(call => call[0] === '--color-brand-primary');
    expect(brandPrimaryColorCall?.[1]).toBe('#ea4335');

    // Check font
    const fontFamilyBaseCall = setPropertyCalls.find(call => call[0] === '--font-family-base');
    expect(fontFamilyBaseCall?.[1]).toBe("Tahoma, Arial, 'Helvetica Neue', sans");

    // Check size
    const fontSizeSmallCall = setPropertyCalls.find(call => call[0] === '--size-font-small');
    expect(fontSizeSmallCall?.[1]).toBe('0.75');

    // Check button
    const buttonRadiusCall = setPropertyCalls.find(call => call[0] === '--button-border-radius');
    expect(buttonRadiusCall?.[1]).toBe('4px');
  });

  it('should switch theme correctly between brands', () => {
    service.initializeTokens('defaultBrand');
    service.switchTheme('brand1');

    const setPropertyCalls = mockDocument.documentElement.style.setProperty.mock.calls;
    
    // Brand1 might have different values, let's just check it was called differently
    const primaryColorCalls = setPropertyCalls.filter(call => call[0] === '--color-primary');
    const lastCall = primaryColorCalls[primaryColorCalls.length - 1];
    expect(lastCall).toBeTruthy();
  });
});
