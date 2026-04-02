import { ChangeDetectionStrategy, Component, computed, input, output, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DataGridHeaderComponent } from '../../molecules/data-grid-header/data-grid-header.component';
import { PaginationComponent } from '../../molecules/pagination/pagination.component';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';
import { DataGridRowComponent } from '../../molecules/data-grid-row/data-grid-row.component';
import { DataGridColumnComponent } from '../../molecules/data-grid-column/data-grid-column.component';
import { DataGridFilterComponent } from '../../molecules/data-grid-filter/data-grid-filter.component';
import { type DataGridRecord, type DataGridColumn } from './data-grid.types';
import { type FilterState } from '../../molecules/data-grid-filter/data-grid-filter.types';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-data-grid',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    ScrollingModule,
    DataGridHeaderComponent,
    SearchBarComponent,
    PaginationComponent,
    DataGridRowComponent,
    DataGridColumnComponent,
    DataGridFilterComponent,
    ReactiveFormsModule
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
          <div 
            class="hidden lg:grid border-b border-gray-light bg-gray-light/50"
            [style.grid-template-columns]="gridTemplateColumns()"
          >
            @for (col of columns(); track col.id) {
              <ds-data-grid-column [align]="col.align || 'left'">
                @if (col.headerComponent) {
                  <ng-container *ngComponentOutlet="col.headerComponent; inputs: { label: (col.label | translate) }" />
                } @else {
                  {{ col.label | translate }}
                }
              </ds-data-grid-column>
            }
          </div>

          <!-- VIRTUAL SCROLL -->
          <cdk-virtual-scroll-viewport 
            [itemSize]="isMobile() ? 150 : 72" 
            class="flex-1 custom-scrollbar w-full"
          >
            <ds-data-grid-row 
              *cdkVirtualFor="let row of filteredData(); trackBy: trackById" 
              [record]="row"
              [columns]="columns()"
              [gridTemplateColumns]="gridTemplateColumns()"
            />

            </cdk-virtual-scroll-viewport>
            @if (filteredData().length === 0) {
              <div class="flex items-center justify-center h-full min-h-[300px]">
                <p>{{ 'common.empty' | translate }}</p>
              </div>
            } 
          
          <!-- PAGINATION -->
          <ds-pagination 
            [rangeLabel]="pageRangeProps().key | translate:pageRangeProps().params"
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
  searchPlaceholder = input<string>('');
  data = input<DataGridRecord[]>([]);
  columns = input<DataGridColumn[]>([]);
  pageSize = input<number>(10);
  isMobile = signal<boolean>(false);

  actionClicked = output<void>();
  searchChange = output<string>();
  filtersChange = output<FilterState>();

  searchTerm = signal('');
  page = signal(0);

  private fb = inject(FormBuilder);

  gridForm = this.fb.group({
    rows: this.fb.array<FormGroup>([])
  });

  gridTemplateColumns = computed(() => {
    return this.columns().map(col => col.width || '1fr').join(' ');
  });

  filteredData = computed(() => {
    const list = this.data();
    const start = this.page() * this.pageSize();
    return list.slice(start, start + this.pageSize());
  });

  pageRangeProps = computed(() => {
    const total = this.data().length;
    if (total === 0) return { key: 'organisms.dataGrid.pagination.empty', params: {} };
    const start = this.page() * this.pageSize() + 1;
    let end = (this.page() + 1) * this.pageSize();
    if (end > total) end = total;
    return { 
      key: 'organisms.dataGrid.pagination.range', 
      params: { start, end, total } 
    };
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
    effect(() => {
      const records = this.data();
      const rowsArray = this.gridForm.controls.rows;
      rowsArray.clear();
      records.forEach(record => {
        rowsArray.push(this.fb.group({
          id: [record.id],
          nome: [record.nome || ''],
          pais: [record.pais || ''],
          estado: [record.estado || ''],
          dataInicio: [record.dataInicio || ''],
          dataFim: [record.dataFim || ''],
        }));
      });
    });

    if (typeof window !== 'undefined') {
      const checkMobile = () => this.isMobile.set(window.innerWidth < 1024);
      checkMobile();
      window.addEventListener('resize', checkMobile);
    }
  }
}

