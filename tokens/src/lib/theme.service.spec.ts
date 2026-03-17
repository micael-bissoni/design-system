import { vitest as vi, describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { DOCUMENT } from '@angular/common';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockDocument: {
    documentElement: {
      style: {
        setProperty: (key: string, value: string) => void;
      };
    };
  };

  beforeEach(() => {
    mockDocument = {
      documentElement: {
        style: {
          setProperty: (key: string, value: string) => {}
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

  it('should set css variables when initializing tokens', () => {
    const setPropertySpy = vi.spyOn(mockDocument.documentElement.style, 'setProperty');
    
    service.initializeTokens();
    
    // It should have called setProperty for colors, spacing, etc.
    expect(setPropertySpy).toHaveBeenCalled();
    expect(setPropertySpy).toHaveBeenCalledWith('--color-primary', '#0F172A');
  });
});
