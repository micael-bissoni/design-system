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
      setAttribute: ReturnType<typeof vi.fn>;
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
        },
        setAttribute: vi.fn()
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

  it('should set css variables when initializing tokens defaults to trevvo', () => {
    service.initializeTokens();
    const setPropertyCalls = mockDocument.documentElement.style.setProperty.mock.calls;
    
    expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalled();
    // Trevvo brand color check
    const primaryColorCall = setPropertyCalls.find(call => call[0] === '--color-primary');
    expect(primaryColorCall).toBeTruthy();
    expect(primaryColorCall?.[1]).toBe('#0F172A'); 
  });

  it('should switch theme correctly to partner brand', () => {
    service.initializeTokens();
    // switch to partner
    service.switchTheme('partner');
    
    const setPropertyCalls = mockDocument.documentElement.style.setProperty.mock.calls;
    // The last call for primary color should be the partner brand's color
    const primaryColorCalls = setPropertyCalls.filter(call => call[0] === '--color-primary');
    const lastPrimaryColorCall = primaryColorCalls[primaryColorCalls.length - 1];
    
    expect(lastPrimaryColorCall).toBeTruthy();
    expect(lastPrimaryColorCall[1]).toBe('#4338CA'); 
  });
});
