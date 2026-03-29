export interface DataGridRecord {
  id: string;
  nome: string;
  pais: string;
  dataInicio: string;
  dataFim: string;
  estado: string;
  [key: string]: string;
}

export interface DataGridColumn {
  key: keyof DataGridRecord | string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}
