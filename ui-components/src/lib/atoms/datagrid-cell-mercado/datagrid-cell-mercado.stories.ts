import { Meta, StoryObj } from '@storybook/angular';
import { DatagridCellMercadoComponent } from './datagrid-cell-mercado.component';
import { FormControl } from '@angular/forms';

const meta: Meta<DatagridCellMercadoComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridRow/Atoms/DatagridCellMercado',
  component: DatagridCellMercadoComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DatagridCellMercadoComponent>;

export const Default: Story = {
  args: {
    pais: 'Brazil',
    editMode: false,
    control: undefined,
  },
};

export const EditMode: Story = {
  args: {
    pais: 'Brazil',
    editMode: true,
    control: new FormControl('USA'),
  },
};
