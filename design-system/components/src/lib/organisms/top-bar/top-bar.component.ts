import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { UserProfile } from '../../templates/main-template/main-template.types';

@Component({
  selector: 'ds-top-bar',
  standalone: true,
  imports: [CommonModule, TranslatePipe, SearchBarComponent, AvatarComponent, IconComponent],
  template: `
    <header 
      class="h-20 bg-white border-b border-gray-light flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50 shadow-sm"
      data-testid="ds-top-bar"
    >
      <div class="flex items-center gap-4 flex-1">
        <!-- Mobile Menu Toggle -->
        <button 
          (click)="toggleMenu.emit()"
          class="lg:hidden p-2.5 text-gray-medium hover:bg-gray-light/50 rounded-xl transition-all"
        >
          <ds-icon name="menu" size="medium"></ds-icon>
        </button>

        <div class="flex-1 max-w-xl hidden md:block">
          <ds-search-bar [placeholder]="searchPlaceholder() | translate"></ds-search-bar>
        </div>
      </div>

      <div class="flex items-center gap-3 sm:gap-6">
        <div class="flex items-center gap-1 sm:gap-2">
          <button class="p-2.5 text-gray-medium hover:bg-gray-light/50 rounded-xl transition-all relative group">
            <ds-icon name="bell" size="medium"></ds-icon>
            @if (hasNotifications()) {
              <span class="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white animate-pulse"></span>
            }
          </button>
          <button class="hidden sm:block p-2.5 text-gray-medium hover:bg-gray-light/50 rounded-xl transition-all">
            <ds-icon name="question-mark-circle" size="medium"></ds-icon>
          </button>
        </div>

        <div class="h-8 w-px bg-gray-light mx-1 sm:mx-2"></div>

        <div 
          (click)="userProfileClick.emit()"
          class="flex items-center gap-2 sm:gap-3 cursor-pointer group p-1 sm:p-1.5 sm:pr-3 hover:bg-gray-light/30 rounded-2xl transition-all"
        >
          <ds-avatar 
            [src]="user()?.avatarSrc || null" 
            [firstName]="user()?.firstName || null"
            [lastName]="user()?.lastName || null"
            size="md"
          ></ds-avatar>
          <div class="hidden sm:flex flex-col">
            <span class="text-sm font-bold text-gray-dark group-hover:text-primary transition-colors">
              {{ user() ? (user()!.firstName + ' ' + user()!.lastName) : ('common.guest' | translate) }}
            </span>
            <span class="text-[10px] font-black uppercase text-gray-medium tracking-widest leading-tight">
              {{ userRole() | translate }}
            </span>
          </div>
          <ds-icon name="chevron-down" size="small" class="text-gray-medium ml-1 group-hover:translate-y-0.5 transition-transform"></ds-icon>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  user = input<UserProfile | null>(null);
  userRole = input<string>('common.roles.administrator');
  searchPlaceholder = input<string>('common.searchPlaceholder');
  hasNotifications = input<boolean>(false);
  
  userProfileClick = output<void>();
  toggleMenu = output<void>();
}
