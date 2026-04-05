import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

const meta: Meta<SelectComponent> = {
  title: 'Atoms/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

const options = [
  { label: 'English', value: 'en' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select a language',
  },
};

export const WithValue: Story = {
  args: {
    options,
    placeholder: 'Select a language',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-xs">
        <ds-select [options]="options" [placeholder]="placeholder"></ds-select>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    options,
    placeholder: 'Select a language',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-xs">
        <ds-select [options]="options" [placeholder]="placeholder" [disabled]="true"></ds-select>
      </div>
    `,
  }),
};
