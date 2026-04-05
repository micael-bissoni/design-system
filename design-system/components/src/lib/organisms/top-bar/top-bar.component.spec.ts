import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { InputComponent } from '../../atoms/input/input.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent, SearchBarComponent, AvatarComponent, IconComponent, InputComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search bar', () => {
    const searchBar = fixture.nativeElement.querySelector('ds-search-bar');
    expect(searchBar).toBeTruthy();
  });

  it('should show notification indicator when hasNotifications is true', () => {
    fixture.componentRef.setInput('hasNotifications', true);
    fixture.detectChanges();
    
    const indicator = fixture.nativeElement.querySelector('.bg-danger');
    expect(indicator).toBeTruthy();
  });
});
