import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SidebarComponent } from '../../organisms/sidebar/sidebar.component';
import { TopBarComponent } from '../../organisms/top-bar/top-bar.component';
import { NavigationItem, UserProfile } from '../main-template/main-template.types';
import { MainTemplateComponent } from '../main-template/main-template.component';

@Component({
  selector: 'ds-dashboard-layout',
  standalone: true,
  imports: [CommonModule, TranslatePipe, SidebarComponent, TopBarComponent, MainTemplateComponent],
  template: `
    <ds-main-template 
      [style.--sidebar-width]="isSidebarCollapsed() ? '80px' : '280px'"
      class="animate-in fade-in duration-500"
    >
      <!-- Navigation Area (Desktop Sidebar) -->
      <ds-sidebar 
        navigation
        class="hidden lg:flex"
        [items]="navigationItems()" 
        [collapsed]="isSidebarCollapsed()" 
        (toggle)="isSidebarCollapsed.set($event)"
        (itemSelected)="navigationChange.emit($event)"
        [appName]="appName()"
      ></ds-sidebar>

      <!-- Header Area (TopBar) -->
      <ds-top-bar 
        header
        [user]="user()" 
        [searchPlaceholder]="searchPlaceholder()"
        [hasNotifications]="hasNotifications()"
        (userProfileClick)="userProfileClick.emit()"
        (toggleMenu)="isMobileMenuOpen.set(true)"
        class="w-full"
      ></ds-top-bar>

      <!-- Main Content Slot -->
      <div class="animate-in slide-in-from-bottom-8 duration-700">
        <ng-content></ng-content>
      </div>

      <!-- Mobile Sidebar Overlay (Drawer) -->
      <!-- We keep this in DashboardLayout as it's a specific specialization -->
      <div 
        class="lg:hidden fixed inset-0 z-[100] pointer-events-none transition-all duration-300"
        [class.pointer-events-auto]="isMobileMenuOpen()"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500"
          [class.opacity-0]="!isMobileMenuOpen()"
          [class.opacity-100]="isMobileMenuOpen()"
          (click)="isMobileMenuOpen.set(false)"
        ></div>

        <!-- Sidebar Container -->
        <aside 
          class="absolute top-0 left-0 h-full w-72 bg-white shadow-2xl transition-transform duration-500 cubic-bezier"
          [class.-translate-x-full]="!isMobileMenuOpen()"
          [class.translate-x-0]="isMobileMenuOpen()"
        >
          <ds-sidebar 
            [items]="navigationItems()" 
            [collapsed]="false" 
            (toggle)="isMobileMenuOpen.set(false)"
            (itemSelected)="onMenuItemClick($event)"
            [appName]="appName()"
          ></ds-sidebar>
        </aside>
      </div>
    </ds-main-template>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .cubic-bezier {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  appName = input<string>('TREVVO');
  navigationItems = input.required<NavigationItem[]>();
  user = input<UserProfile | null>(null);
  searchPlaceholder = input<string>('common.searchPlaceholder');
  hasNotifications = input<boolean>(false);

  navigationChange = output<NavigationItem>();
  userProfileClick = output<void>();

  isSidebarCollapsed = signal<boolean>(false);
  isMobileMenuOpen = signal<boolean>(false);

  onMenuItemClick(item: NavigationItem) {
    this.navigationChange.emit(item);
    this.isMobileMenuOpen.set(false);
  }
}
