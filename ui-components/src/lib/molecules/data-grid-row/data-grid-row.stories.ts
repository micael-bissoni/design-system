import type { Meta, StoryObj } from '@storybook/angular';
import { DataGridRowComponent } from './data-grid-row.component';

const meta: Meta<DataGridRowComponent> = {
  title: 'Molecules/DataGridRow',
  component: DataGridRowComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DataGridRowComponent>;

export const Default: Story = {
  args: {
    record: { 
      id: 'REG-001', 
      nome: 'Distribuição Lisboa Norte', 
      pais: 'Portugal', 
      dataInicio: '01 Jan 2024', 
      dataFim: '31 Dez 2024', 
      estado: 'Ativo' 
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-40 bg-white p-4">
        <ds-data-grid-row [record]="record"></ds-data-grid-row>
      </div>
    `,
  }),
};

export const Pending: Story = {
  args: {
    record: { 
      id: 'REG-002', 
      nome: 'Logística Madrid Central', 
      pais: 'Espanha', 
      dataInicio: '15 Fev 2024', 
      dataFim: '15 Fev 2025', 
      estado: 'Pendente' 
    },
  },
};

export const Cancelled: Story = {
  args: {
    record: { 
      id: 'REG-003', 
      nome: 'Operação Paris Quest', 
      pais: 'França', 
      dataInicio: '10 Mar 2024', 
      dataFim: '10 Mar 2025', 
      estado: 'Cancelado' 
    },
  },
};
