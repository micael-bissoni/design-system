import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
  title: 'Molecules/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
  argTypes: {
    rangeLabel: { control: 'text' },
    prevDisabled: { control: 'boolean' },
    nextDisabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  args: {
    rangeLabel: '1 - 10 de 150',
    prevDisabled: false,
    nextDisabled: false,
  },
};

export const FirstPage: Story = {
  args: {
    rangeLabel: '1 - 10 de 52',
    prevDisabled: true,
    nextDisabled: false,
  },
};

export const LastPage: Story = {
  args: {
    rangeLabel: '51 - 52 de 52',
    prevDisabled: false,
    nextDisabled: true,
  },
};
