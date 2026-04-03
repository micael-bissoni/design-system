import { Type } from '@angular/core';

export interface DataGridRecord {
  id: string;
  nome: string;
  pais: string;
  dataInicio: string;
  dataFim: string;
  estado: string;
  [key: string]: string | number | boolean;
}

export interface DataGridColumn {
  id: string;
  label: string;
  key?: keyof DataGridRecord;
  width?: string; // Value like '1fr', '150px', etc.
  align?: 'left' | 'center' | 'right';
  headerComponent?: Type<any>;
  cellComponent?: Type<any>;
  cellConfig?: (record: DataGridRecord) => Record<string, any>;
}

