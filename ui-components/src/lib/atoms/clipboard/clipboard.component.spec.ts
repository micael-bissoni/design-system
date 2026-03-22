import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ClipboardComponent } from './clipboard.component';
import { By } from '@angular/platform-browser';

describe('ClipboardComponent', () => {
  let component: ClipboardComponent;
  let fixture: ComponentFixture<ClipboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipboardComponent);
    component = fixture.componentInstance;
    component.content = 'test-content';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hover classes in the template', () => {
    const container = fixture.debugElement.query(By.css('div.group'));
    const buttonContainer = fixture.debugElement.query(By.css('.absolute'));

    expect(container.nativeElement.classList.contains('group')).toBeTruthy();
    expect(buttonContainer.nativeElement.classList.contains('opacity-0')).toBeTruthy();
    expect(buttonContainer.nativeElement.classList.contains('invisible')).toBeTruthy();
    expect(buttonContainer.nativeElement.classList.contains('group-hover:opacity-100')).toBeTruthy();
    expect(buttonContainer.nativeElement.classList.contains('group-hover:visible')).toBeTruthy();
  });

  it('should call onCopy when button is clicked', () => {
    const onCopySpy = spyOn(component, 'onCopy').and.callThrough();
    const button = fixture.debugElement.query(By.css('ds-button'));
    button.nativeElement.click();
    expect(onCopySpy).toHaveBeenCalled();
  });

  it('should change icon after copy and reset after timer', fakeAsync(() => {
    component.onCopy();
    fixture.detectChanges();

    expect(component.copied).toBeTrue();

    tick(3000);
    fixture.detectChanges();
    expect(component.copied).toBeFalse();
  }));
});
