import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationItem } from '../../templates/main-template/main-template.types';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'ds-sidebar',
  standalone: true,
  imports: [CommonModule, TranslatePipe, IconComponent],
  template: `
    <aside 
      class="flex flex-col h-screen bg-white border-r border-gray-light transition-all duration-300 ease-in-out shadow-sm overflow-hidden"
      [class.w-64]="!collapsed()"
      [class.w-20]="collapsed()"
      data-testid="ds-sidebar"
    >
      <!-- Logo Section -->
      <div class="h-20 flex items-center px-6 border-b border-gray-light">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center text-white flex-shrink-0 transition-transform active:scale-95 cursor-pointer">
             <div class="w-6 h-6 bg-contain bg-no-repeat bg-center" [style.backgroundImage]="'var(--icon-logo)'"></div>
          </div>
          @if (!collapsed()) {
            <span class="text-xl font-black text-gray-dark tracking-tighter uppercase animate-in fade-in slide-in-from-left-4 duration-500">
              {{ appName() }}
            </span>
          }
        </div>
      </div>

      <!-- Navigation Section -->
      <nav class="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        @for (item of items(); track item.id) {
          <div 
            (click)="onItemClick(item)"
            class="group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200"
            [class.bg-primary]="item.active"
            [class.text-on-primary]="item.active"
            [class.hover:bg-gray-light/50]="!item.active"
            [class.text-gray-medium]="!item.active"
            [title]="collapsed() ? (item.label | translate) : ''"
            data-testid="sidebar-item"
          >
            @if (item.active) {
               <div class="absolute inset-y-2 left-0 w-1 bg-white rounded-full group-hover:inset-y-1 transition-all"></div>
            }
            
            <div class="flex-shrink-0 flex items-center justify-center w-6 h-6" [class.text-on-primary]="item.active">
              @if (item.icon) {
                <ds-icon [name]="item.icon" intent="inherit" size="medium" [class]="item.active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'"></ds-icon>
              }
            </div>
            
            @if (!collapsed()) {
              <span class="font-bold text-sm truncate animate-in fade-in slide-in-from-left-2 duration-300">
                {{ item.label | translate }}
              </span>
            }
          </div>
        }
      </nav>

      <!-- Footer / Toggle Section -->
      <div class="p-3 border-t border-gray-light bg-gray-light/5">
        <button 
          (click)="toggleCollapse()"
          class="flex items-center gap-3 w-full p-3 text-gray-medium hover:bg-gray-light/50 hover:text-gray-dark rounded-xl transition-all duration-200 group"
          data-testid="sidebar-toggle"
        >
          <div class="flex-shrink-0 flex items-center justify-center w-6 h-6 transition-transform group-hover:scale-110">
            <ds-icon [name]="collapsed() ? 'chevron-right' : 'chevron-left'" size="small"></ds-icon>
          </div>
          @if (!collapsed()) {
            <span class="text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-2 duration-300">
              {{ 'organisms.sidebar.collapse' | translate }}
            </span>
          }
        </button>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  appName = input<string>('TREVVO');
  items = input.required<NavigationItem[]>();
  collapsed = input<boolean>(false);
  toggle = output<boolean>();
  itemSelected = output<NavigationItem>();

  toggleCollapse() {
    this.toggle.emit(!this.collapsed());
  }

  onItemClick(item: NavigationItem) {
    this.itemSelected.emit(item);
  }
}
