import type { Meta, StoryObj } from '@storybook/angular';
import { DataGridHeaderComponent } from './data-grid-header.component';

const meta: Meta<DataGridHeaderComponent> = {
  title: 'Molecules/DataGridHeader',
  component: DataGridHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    actionLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DataGridHeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Gestão Operacional',
    subtitle: 'Controlo total dos fluxos da plataforma',
    actionLabel: 'Exportar Dados',
  },
};

export const Minimal: Story = {
  args: {
    title: 'Lista de Utilizadores',
    subtitle: '',
    actionLabel: '',
  },
};
