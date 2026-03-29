import { Meta, StoryObj } from '@storybook/angular';
import { DatagridCellValidadeComponent } from './datagrid-cell-validade.component';
import { FormControl } from '@angular/forms';

const meta: Meta<DatagridCellValidadeComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridRow/Atoms/DatagridCellValidade',
  component: DatagridCellValidadeComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DatagridCellValidadeComponent>;

export const Default: Story = {
  args: {
    dataInicio: '01/01/2023',
    dataFim: '31/12/2023',
    editMode: false,
    controlInicio: undefined,
    controlFim: undefined,
  },
};

export const EditMode: Story = {
  args: {
    dataInicio: '01/01/2023',
    dataFim: '31/12/2023',
    editMode: true,
    controlInicio: new FormControl('2024-01-01'),
    controlFim: new FormControl('2024-12-31'),
  },
};
