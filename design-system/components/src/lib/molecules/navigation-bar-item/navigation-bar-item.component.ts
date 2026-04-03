import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-navigation-bar-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      type="button"
      [class.text-primary]="active()"
      [class.text-gray-medium]="!active()"
      (click)="select.emit()"
      class="flex flex-col items-center gap-1 outline-none transition-colors relative group"
    >
      <div class="p-1 rounded-xl">
        <ng-content select="[icon]"></ng-content>
      </div>
      <span class="text-[9px] font-black uppercase">
        <ng-content></ng-content>
      </span>
      @if (active()) {
        <div class="absolute -bottom-2 w-1.5 h-1.5 bg-primary rounded-full md:hidden"></div>
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarItemComponent {
  active = input<boolean>(false);
  select = output<void>();
}
