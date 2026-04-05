import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTemplateComponent } from '../main-template/main-template.component';
import { NavigationItem, UserProfile } from '../main-template/main-template.types';

@Component({
  selector: 'ds-dashboard-layout',
  standalone: true,
  imports: [CommonModule, MainTemplateComponent],
  template: `
    <ds-main-template 
      [appName]="appName()"
      [title]="title()"
      [navigationItems]="navigationItems()"
      [user]="user()"
      [selectedCount]="selectedCount()"
      (addSelected)="addSelected.emit()"
      (editSelected)="editSelected.emit()"
      (deleteSelected)="deleteSelected.emit()"
      (itemSelected)="navigationChange.emit($event)"
      class="animate-in fade-in duration-500"
    >
      <!-- Main Content Slot with Dashboard Specific Animation -->
      <div class="animate-in slide-in-from-bottom-8 duration-700 h-full p-6 md:p-10">
        <ng-content></ng-content>
      </div>
    </ds-main-template>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  appName = input<string>('TREVVO');
  title = input<string>('');
  navigationItems = input.required<NavigationItem[]>();
  user = input<UserProfile | null>(null);
  selectedCount = input<number>(0);

  navigationChange = output<NavigationItem>();
  addSelected = output<void>();
  editSelected = output<void>();
  deleteSelected = output<void>();
}
