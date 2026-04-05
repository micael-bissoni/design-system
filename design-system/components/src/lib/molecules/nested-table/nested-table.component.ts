import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type DataGridColumn, type DataGridNestedConfig } from '../../organisms/data-grid/data-grid.types';

@Component({
  selector: 'ds-nested-table',
  standalone: true,
  imports: [CommonModule, NestedTableComponent],
  template: `
    <div 
      class="w-full overflow-hidden rounded-xl border border-gray-light shadow-sm transition-colors"
      [ngStyle]="getBgStyle()"
    >
      
      <!-- DESKTOP VIEW (TABLE) -->
      <div class="hidden lg:block overflow-x-auto">
        <table class="w-full table-auto border-collapse text-left text-[11px] text-gray-medium">
          <thead class="bg-gray-light/30 border-b border-gray-light uppercase font-black tracking-widest text-[9px]">
            <tr>
              <th class="px-4 py-3 w-8"></th>
              <th class="px-4 py-3 w-8">#</th>
              @for (col of columns(); track col.id) {
                <th class="px-4 py-3">{{ col.label }}</th>
              }
              <th class="px-4 py-3 text-right">
                <button 
                  (click)="nestedAddRow.emit()"
                  class="rounded-full p-1 text-primary-600 transition hover:bg-primary-50"
                  title="Add Row"
                >
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-light/10">
            @for (row of data(); track $index) {
              <tr class="transition hover:bg-gray-light/5">
                <td class="px-4 py-2 w-8">
                  @if (nestedConfig() && row[nestedConfig()!.dataKey]?.length) {
                    <button 
                      (click)="toggleRow($index)"
                      class="p-1 rounded hover:bg-gray-light/50 transition-transform duration-200"
                      [class.rotate-90]="expandedRows().has($index)"
                    >
                      <svg class="h-3 w-3 text-gray-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  }
                </td>
                <td class="px-4 py-2 font-mono text-[10px] w-8 opacity-40">{{ $index + 1 }}</td>
                @for (col of columns(); track col.id) {
                  <td class="whitespace-nowrap px-4 py-2 text-gray-dark font-medium underline decoration-primary-200/30 underline-offset-4 decoration-1 decoration-dashed">{{ row[col.key || ''] }}</td>
                }
                <td class="px-4 py-2 text-right">
                  <button 
                    (click)="nestedRemoveRow.emit(row)"
                    class="rounded-full p-1 text-red-500 transition hover:bg-red-50"
                    title="Remove Row"
                  >
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
              @if (expandedRows().has($index) && nestedConfig()) {
                <tr>
                  <td [attr.colspan]="columns().length + 3" class="p-3">
                    <ds-nested-table 
                      [columns]="nestedConfig()!.columns"
                      [data]="row[nestedConfig()!.dataKey] || []"
                      [nestedConfig]="nestedConfig()!.nestedConfig"
                      [level]="level() + 1"
                    />
                  </td>
                </tr>
              }
            } @empty {
              <tr>
                <td [attr.colspan]="columns().length + 3" class="px-4 py-8 text-center text-gray-medium italic">
                  Nenhum dado encontrado.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- MOBILE VIEW (CARDS) -->
      <div class="lg:hidden flex flex-col divide-y divide-gray-light/10">
        @for (row of data(); track $index) {
          <div class="p-3 flex flex-col gap-2 bg-white/40 hover:bg-white/60 transition-colors">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="font-mono text-[9px] text-gray-lightest select-none">#{{ $index + 1 }}</span>
                <span class="text-xs font-bold text-gray-dark truncate max-w-[150px]">
                  {{ row[columns()[0].key || ''] }}
                </span>
              </div>
              <div class="flex items-center gap-1">
                @if (nestedConfig() && row[nestedConfig()!.dataKey]?.length) {
                  <button 
                    (click)="toggleRow($index)"
                    class="p-2 rounded-lg bg-white/60 text-gray-medium shadow-sm border border-gray-light/20"
                    [class.rotate-90]="expandedRows().has($index)"
                  >
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                }
                <button 
                  (click)="nestedRemoveRow.emit(row)"
                  class="p-2 rounded-lg bg-red-50 text-red-500 shadow-sm border border-red-100"
                >
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- CARD DETAILS -->
            <div class="grid grid-cols-2 gap-x-4 gap-y-1">
              @for (col of columns().slice(1); track col.id) {
                <div class="flex flex-col gap-0.5">
                  <span class="text-[8px] font-black uppercase text-gray-lightest tracking-wider">{{ col.label }}</span>
                  <span class="text-[10px] text-gray-medium truncate">{{ row[col.key || ''] }}</span>
                </div>
              }
            </div>

            <!-- NESTED CONTENT (MOBILE) -->
            @if (expandedRows().has($index) && nestedConfig()) {
              <div class="mt-2 pl-2 border-l-2 py-1" [ngStyle]="getBorderStyle()">
                <ds-nested-table 
                  [columns]="nestedConfig()!.columns"
                  [data]="row[nestedConfig()!.dataKey] || []"
                  [nestedConfig]="nestedConfig()!.nestedConfig"
                  [level]="level() + 1"
                />
              </div>
            }
          </div>
        } @empty {
          <div class="px-4 py-6 text-center text-gray-medium text-xs italic">
            Nenhum dado encontrado.
          </div>
        }
      </div>

      <!-- MOBILE ADD ACTION (FOOTER) -->
      <div class="lg:hidden p-2 border-t border-gray-light/30 bg-gray-light/5 flex justify-center">
         <button 
            (click)="nestedAddRow.emit()"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm"
          >
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Adicionar Registo
          </button>
      </div>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableComponent {
  columns = input.required<DataGridColumn[]>();
  data = input.required<any[]>();
  nestedConfig = input<DataGridNestedConfig | undefined>();
  level = input<number>(1);

  nestedAddRow = output<void>();
  nestedRemoveRow = output<any>();

  expandedRows = signal<Set<number>>(new Set());

  // Calculates background style dynamically
  getBgStyle(): Record<string, string> {
    const depth = this.level();
    const opacity = Math.min(depth * 0.05, 0.25);
    return { 'background-color': `rgba(0, 0, 0, ${opacity})` };
  }

  // Calculates border style dynamically
  getBorderStyle(): Record<string, string> {
    const depth = this.level();
    const grayValue = Math.max(220 - (depth * 20), 100);
    return { 'border-color': `rgb(${grayValue}, ${grayValue}, ${grayValue})` };
  }

  toggleRow(index: number) {
    const next = new Set(this.expandedRows());
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    this.expandedRows.set(next);
  }
}
