import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainTemplateComponent } from './main-template.component';
import { describe, beforeEach, it, expect, afterEach } from 'vitest';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [MainTemplateComponent],
  template: `
    <ds-main-template>
      <div header id="test-header">Header Title</div>
      <div navigation id="test-navigation">Aside Navigation</div>
      <div id="test-content">Main Content Body</div>
    </ds-main-template>
  `
})
class HostComponent {}

describe('MainTemplateComponent', () => {
  let component: MainTemplateComponent;
  let fixture: ComponentFixture<MainTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTemplateComponent, HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render projected content in header slot', () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();
    
    const header = hostFixture.nativeElement.querySelector('#test-header');
    expect(header).toBeTruthy();
    expect(header.textContent).toBe('Header Title');
  });

  it('should render projected content in navigation slot', () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();
    
    const nav = hostFixture.nativeElement.querySelector('#test-navigation');
    expect(nav).toBeTruthy();
    expect(nav.textContent).toBe('Aside Navigation');
  });

  it('should render projected content in default slot', () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();
    
    const content = hostFixture.nativeElement.querySelector('#test-content');
    expect(content).toBeTruthy();
    expect(content.textContent).toBe('Main Content Body');
  });
});
