import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DataGridHeaderComponent, PaginationComponent, SearchBarComponent, DataGridRowComponent, DataGridColumnComponent, DataGridFilterComponent } from '../../molecules';
import { type DataGridRecord } from './data-grid.types';
import { type FilterState } from '../../molecules/data-grid-filter/data-grid-filter.types';

@Component({
  selector: 'ds-data-grid',
  standalone: true,
  imports: [
    CommonModule, 
    ScrollingModule, 
    DataGridHeaderComponent, 
    SearchBarComponent, 
    PaginationComponent,
    DataGridRowComponent,
    DataGridColumnComponent,
    DataGridFilterComponent
  ],
  template: `
    <main class="flex-1 grid grid-rows-[auto_1fr] overflow-hidden w-full h-full">
      <!-- HEADER & SEARCH -->
      <div class="p-6 lg:p-10 pb-4">
        <ds-data-grid-header 
          [title]="title()" 
          [subtitle]="subtitle()" 
          [actionLabel]="actionLabel()"
          (actionClicked)="actionClicked.emit()"
        />

        <div class="flex gap-4">
          <ds-search-bar 
            [placeholder]="searchPlaceholder()"
            [value]="searchTerm()"
            (valueChange)="onSearch($event)"
            class="flex-1"
          />
          <ds-data-grid-filter 
            (filtersApplied)="onFiltersApplied($event)"
            (filtersReset)="onFiltersReset()"
          />
        </div>
      </div>

      <!-- TABLE / LIST -->
      <div class="px-6 lg:px-10 pb-8 overflow-hidden h-full">
        <div class="h-full flex flex-col bg-white lg:rounded-[32px] border border-gray-light shadow-sm overflow-hidden relative">
          
          <!-- DESKTOP HEADER -->
          <div class="hidden lg:grid grid-cols-[1fr_150px_180px_120px] border-b border-gray-light bg-gray-light/50">
            <ds-data-grid-column>Designação</ds-data-grid-column>
            <ds-data-grid-column>Mercado</ds-data-grid-column>
            <ds-data-grid-column align="center">Validade</ds-data-grid-column>
            <ds-data-grid-column align="center">Estado</ds-data-grid-column>
          </div>

          <!-- VIRTUAL SCROLL -->
          <cdk-virtual-scroll-viewport 
            [itemSize]="isMobile() ? 150 : 72" 
            class="flex-1 custom-scrollbar w-full"
          >
            <ds-data-grid-row 
              *cdkVirtualFor="let row of filteredData(); trackBy: trackById" 
              [record]="row"
            />
          </cdk-virtual-scroll-viewport>

          <!-- PAGINATION -->
          <ds-pagination 
            [rangeLabel]="pageRange()"
            [prevDisabled]="page() === 0"
            [nextDisabled]="isLastPage()"
            (prev)="prevPage()"
            (next)="nextPage()"
          />
        </div>
      </div>
    </main>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-gray-light); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-gray-medium); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent {
  title = input.required<string>();
  subtitle = input<string>('');
  actionLabel = input<string>('');
  searchPlaceholder = input<string>('Pesquisa global inteligente...');
  data = input<DataGridRecord[]>([]);
  pageSize = input<number>(10);
  isMobile = signal<boolean>(false); // This could be handled by a service or MediaQuery

  actionClicked = output<void>();
  searchChange = output<string>();
  filtersChange = output<FilterState>();

  searchTerm = signal('');
  page = signal(0);

  filteredData = computed(() => {
    const list = this.data();
    
    // Filtering is now handled on the backend
    const start = this.page() * this.pageSize();
    return list.slice(start, start + this.pageSize());
  });

  pageRange = computed(() => {
    const total = this.data().length;
    if (total === 0) return '0 - 0 de 0';
    const start = this.page() * this.pageSize() + 1;
    let end = (this.page() + 1) * this.pageSize();
    if (end > total) end = total;
    return `${start} - ${end} de ${total}`;
  });

  isLastPage = computed(() => {
    return (this.page() + 1) * this.pageSize() >= this.data().length;
  });

  trackById(_: number, item: DataGridRecord): string {
    return item.id;
  }

  nextPage(): void {
    if (!this.isLastPage()) this.page.update(p => p + 1);
  }

  prevPage(): void {
    if (this.page() > 0) this.page.update(p => p - 1);
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.page.set(0); 
    this.searchChange.emit(term);
  }

  onFiltersApplied(filters: FilterState) {
    this.page.set(0);
    this.filtersChange.emit(filters);
  }

  onFiltersReset() {
    this.page.set(0);
    const reset: FilterState = { regions: new Set(), status: 'Todos' };
    this.filtersChange.emit(reset);
  }

  constructor() {
    // Simple mobile detection for example purposes
    if (typeof window !== 'undefined') {
      const checkMobile = () => this.isMobile.set(window.innerWidth < 1024);
      checkMobile();
      window.addEventListener('resize', checkMobile);
    }
  }
}
