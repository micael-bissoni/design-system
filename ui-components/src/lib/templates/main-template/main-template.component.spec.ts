import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainTemplateComponent } from './main-template.component';

describe('MainTemplateComponent', () => {
  let component: MainTemplateComponent;
  let fixture: ComponentFixture<MainTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have grid classes for responsive layout', () => {
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).toContain('grid');
    expect(container.className).toContain('md:grid-cols-[280px_1fr]');
  });

  it('should render header content from input', () => {
    const testContent = '<div id="test-header">Header Title</div>';
    fixture.componentRef.setInput('headerSlot', testContent);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('#header-slot');
    expect(header.innerHTML).toContain('id="test-header"');
    expect(header.innerHTML).toContain('Header Title');
  });

  it('should render aside content from input', () => {
    const testContent = '<div id="test-aside">Aside Navigation</div>';
    fixture.componentRef.setInput('asideSlot', testContent);
    fixture.detectChanges();
    const aside = fixture.nativeElement.querySelector('#side-nav-slot');
    expect(aside.innerHTML).toContain('id="test-aside"');
    expect(aside.innerHTML).toContain('Aside Navigation');
  });

  it('should render main content from input', () => {
    const testContent = '<div id="test-main">Main Content Body</div>';
    fixture.componentRef.setInput('contentSlot', testContent);
    fixture.detectChanges();
    const main = fixture.nativeElement.querySelector('#content-slot');
    expect(main.innerHTML).toContain('id="test-main"');
    expect(main.innerHTML).toContain('Main Content Body');
  });

  it('should have desktop classes on aside for left sidebar', () => {
    const aside = fixture.nativeElement.querySelector('#side-nav-slot');
    expect(aside.className).toContain('md:col-start-1');
    expect(aside.className).toContain('md:row-start-1');
    expect(aside.className).toContain('md:row-span-2');
  });

  it('should have mobile classes on aside for footer', () => {
    const aside = fixture.nativeElement.querySelector('#side-nav-slot');
    expect(aside.className).toContain('row-start-3');
    expect(aside.className).toContain('col-start-1');
  });
  it('should render title and appName when provided', () => {
    fixture.componentRef.setInput('title', 'Test Dashboard');
    fixture.componentRef.setInput('appName', 'TEST-STORE');
    fixture.detectChanges();
    
    const header = fixture.nativeElement.querySelector('#header-slot');
    expect(header.textContent).toContain('Test Dashboard');
    
    const aside = fixture.nativeElement.querySelector('#side-nav-slot');
    expect(aside.textContent).toContain('TEST-STORE');
  });

  it('should render navigation items when provided', () => {
    const navItems = [
      { id: '1', label: 'Home', route: '/home' },
      { id: '2', label: 'Settings', route: '/settings' }
    ];
    fixture.componentRef.setInput('navigationItems', navItems);
    fixture.detectChanges();
    
    const aside = fixture.nativeElement.querySelector('#side-nav-slot');
    expect(aside.textContent).toContain('Home');
    expect(aside.textContent).toContain('Settings');
  });

  it('should render user info when provided', () => {
    const user = { firstName: 'John', lastName: 'Doe', avatarSrc: 'test.jpg' };
    fixture.componentRef.setInput('user', user);
    fixture.detectChanges();
    
    const header = fixture.nativeElement.querySelector('#header-slot');
    expect(header.textContent).toContain('John Doe');
    const avatar = fixture.nativeElement.querySelector('img');
    expect(avatar.src).toContain('test.jpg');
  });
});
