import { bootstrapApplication } from '@angular/platform-browser';
import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FundationsComponent, DataGridComponent, provideDesignSystem, type DataGridColumn, type DataGridNestedConfig } from '@trevvo/design-system/components';
import { provideStore } from '@ngrx/store';
import { signal } from '@angular/core';

import '@angular/common/locales/global/en';
import '@angular/common/locales/global/pt';
import '@angular/common/locales/global/es';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FundationsComponent, DataGridComponent],
  template: `
    <div class="p-8 bg-gray-50 min-h-screen space-y-8">
      <div class="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 class="text-3xl font-black text-gray-dark tracking-tight">Premium Integrated Data Grid</h1>
          <p class="text-gray-medium text-sm">Unified component with Search, Filter, Pagination and Nested Expansion.</p>
        </header>

        <ds-data-grid 
          title="Gestão de Projetos"
          subtitle="Visualize e edite os detalhes dos seus clientes e tarefas."
          [columns]="mainColumns"
          [data]="tableData()"
          [nestedConfig]="nestedConfig"
          (addRow)="onAddRow()"
          (nestedAddRow)="onAddNested($event)"
        />
      </div>
    </div>
  `,
})
export class AppComponent {
  mainColumns: DataGridColumn[] = [
    { id: 'id', label: 'ID', width: '100px' },
    { id: 'client', label: 'Cliente', key: 'client', width: '1fr' },
    { id: 'status', label: 'Status', key: 'status', width: '150px' }
  ];

  nestedConfig: DataGridNestedConfig = {
    dataKey: 'tasks',
    columns: [
      { id: 'desc', label: 'Tarefa', key: 'desc' },
      { id: 'hours', label: 'Horas', key: 'hours' }
    ]
  };

  tableData = signal([
    { 
      id: 'PJ-001', client: 'Google DeepMind AI', status: 'Ativo',
      tasks: [ { desc: 'Refatoração de Grid', hours: '4h' }, { desc: 'Ajuste de Tokens', hours: '2h' } ]
    },
    { 
      id: 'PJ-002', client: 'Trevvo Design Hub', status: 'Pendente',
      tasks: [ { desc: 'UX Research', hours: '8h' } ]
    }
  ]);

  onAddRow() {
    this.tableData.update(data => [
      ...data, 
      { id: `PJ-00${data.length + 1}`, client: 'Novo Cliente', status: 'Ativo', tasks: [] }
    ]);
  }

  onAddNested(event: { parentRow: any }) {
    this.tableData.update(data => {
      const index = data.findIndex(r => r.id === event.parentRow.id);
      if (index === -1) return data;
      
      const newData = [...data];
      const parent = { ...newData[index] };
      parent.tasks = [...(parent.tasks || []), { desc: 'Nova Subtarefa', hours: '0h' }];
      newData[index] = parent;
      return newData;
    });
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(),
    provideHttpClient(withFetch()),
    provideDesignSystem({
      defaultLocale: 'pt-PT',
      defaultCurrency: 'EUR',
      defaultBrand: 'brand1',
      assetsUrl: './assets/i18n/' // Option to share url from another app assets
    })
  ],
}).catch((err) => console.error(err));
