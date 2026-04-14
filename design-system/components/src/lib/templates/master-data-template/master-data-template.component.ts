import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'ds-master-data-template',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent],
  template: `
    <div class="min-h-screen bg-gray-light/5 p-4 md:p-8 lg:p-12 font-base">
      <div class="max-w-4xl mx-auto space-y-10">
        
        <!-- Header -->
        <header class="flex flex-col md:flex-row md:items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-light">
            <ds-icon [name]="icon()" class="text-primary w-8 h-8"></ds-icon>
          </div>
          <div>
            <h1 class="text-3xl font-headers font-bold text-gray-dark tracking-tight mb-2">
              {{ title() | translate }}
            </h1>
            <p class="text-gray-medium opacity-80 max-w-2xl leading-relaxed">
              {{ subtitle() | translate }}
            </p>
          </div>
        </header>

        <!-- Form Container -->
        <main class="bg-white rounded-[32px] border border-gray-light shadow-xl shadow-gray-dark/5 p-8 md:p-12 overflow-hidden relative">
          <!-- Subtle Decorative Background -->
          <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10">
            <ng-content></ng-content>
          </div>
        </main>

        <!-- Footer Info -->
        <footer class="text-center py-6 text-[10px] font-bold text-gray-medium uppercase tracking-[0.2em] opacity-40">
          {{ 'templates.masterData.footer' | translate }}
        </footer>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterDataTemplateComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  icon = input<string>('management');
}
