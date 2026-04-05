import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-main-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid h-screen w-full overflow-hidden
                grid-cols-1 grid-rows-[auto_1fr]
                md:grid-cols-[var(--sidebar-width,280px)_1fr] md:grid-rows-[var(--header-height,80px)_1fr]
                bg-[#F8FAFC] font-sans">
      
      <!-- Aside / Navigation (Desktop) -->
      <aside id="main-aside" 
             class="hidden md:flex flex-shrink-0 md:col-start-1 md:row-start-1 md:row-span-2 
                    bg-white border-r border-slate-200 overflow-y-auto">
        <ng-content select="[navigation]"></ng-content>
      </aside>

      <!-- Header -->
      <header id="main-header"
              class="row-start-1 col-start-1 md:col-start-2 md:row-start-1
                     flex items-center px-6 z-10 bg-white border-b border-slate-200">
        <ng-content select="[header]"></ng-content>
      </header>

      <!-- Main Content -->
      <main id="main-content"
            class="row-start-2 col-start-1 md:col-start-2 md:row-start-2
                   overflow-y-auto p-4 sm:p-6 lg:p-10 bg-[#F1F5F9] custom-scrollbar">
        <div class="max-w-[1600px] mx-auto">
          <ng-content></ng-content>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
    
    :host {
      display: block;
      height: 100vh;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTemplateComponent {
  // Empty base template - layout only
}
