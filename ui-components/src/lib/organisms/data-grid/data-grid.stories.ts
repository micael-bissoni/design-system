import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { DataGridComponent } from './data-grid.component';
import { type DataGridRecord } from './data-grid.types';

const mockData: DataGridRecord[] = [
  { id: 'REG-001', nome: 'Distribuição Lisboa Norte', pais: 'Portugal', dataInicio: '01 Jan 2024', dataFim: '31 Dez 2024', estado: 'Ativo' },
  { id: 'REG-002', nome: 'Logística Madrid Central', pais: 'Espanha', dataInicio: '15 Fev 2024', dataFim: '15 Fev 2025', estado: 'Pendente' },
  { id: 'REG-003', nome: 'Operação Paris Quest', pais: 'França', dataInicio: '10 Mar 2024', dataFim: '10 Mar 2025', estado: 'Cancelado' },
  { id: 'REG-004', nome: 'Gestão Porto Douro', pais: 'Portugal', dataInicio: '01 Abr 2024', dataFim: '01 Abr 2025', estado: 'Ativo' },
  { id: 'REG-005', nome: 'Hub Barcelona Porto', pais: 'Espanha', dataInicio: '20 Mai 2024', dataFim: '20 Mai 2025', estado: 'Ativo' },
  { id: 'REG-006', nome: 'Distrito Berlim Este', pais: 'Alemanha', dataInicio: '05 Jun 2024', dataFim: '05 Jun 2025', estado: 'Pendente' },
  { id: 'REG-007', nome: 'Operação Londres City', pais: 'Reino Unido', dataInicio: '12 Jul 2024', dataFim: '12 Jul 2025', estado: 'Ativo' },
  { id: 'REG-008', nome: 'Logística Milão Norte', pais: 'Itália', dataInicio: '30 Ago 2024', dataFim: '30 Ago 2025', estado: 'Ativo' },
  { id: 'REG-009', nome: 'Hub Amsterdão Porto', pais: 'Holanda', dataInicio: '15 Set 2024', dataFim: '15 Set 2025', estado: 'Cancelado' },
  { id: 'REG-010', nome: 'Gestão Roma Sul', pais: 'Itália', dataInicio: '01 Out 2024', dataFim: '01 Out 2025', estado: 'Ativo' },
  { id: 'REG-011', nome: 'Distribuição Lisboa Sul', pais: 'Portugal', dataInicio: '10 Nov 2024', dataFim: '10 Nov 2025', estado: 'Ativo' },
];

const meta: Meta<DataGridComponent> = {
  title: 'Organisms/DataGrid',
  component: DataGridComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [OverlayModule, A11yModule],
    }),
  ],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    actionLabel: { control: 'text' },
    pageSize: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<DataGridComponent>;

export const Default: Story = {
  args: {
    title: 'Campanhas Ativas',
    subtitle: 'Gestão operacional da plataforma Trevvo',
    actionLabel: 'Novo Registo',
    data: mockData,
    pageSize: 5,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-[90vh] w-full bg-slate-50 p-4 lg:p-10">
        <ds-data-grid 
          [title]="title" 
          [subtitle]="subtitle" 
          [actionLabel]="actionLabel"
          [data]="data"
          [pageSize]="pageSize"
        ></ds-data-grid>
      </div>
    `,
  }),
};

export const Empty: Story = {
  args: {
    title: 'Sem Dados',
    subtitle: 'Nenhum registo encontrado no sistema',
    data: [],
  },
};
