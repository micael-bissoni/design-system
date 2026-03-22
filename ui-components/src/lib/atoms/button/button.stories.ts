import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    intent: 'primary',
    size: 'medium',
    fullWidth: false,
  },
  render: (args) => ({
    props: args,
    template: `<ds-button [intent]="intent" [size]="size" [fullWidth]="fullWidth">Primary Button</ds-button>`,
  }),
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `<ds-button [intent]="intent">Secondary Button</ds-button>`,
  }),
};

export const Outline: Story = {
  args: {
    intent: 'outline',
  },
  render: (args) => ({
    props: args,
    template: `<ds-button [intent]="intent">Outline Button</ds-button>`,
  }),
};

export const Icon: Story = {
  args: {
    intent: 'outline',
  },
  render: (args) => ({
    props: args,
    template: `<ds-button [intent]="intent"></ds-button>`,
  }),
};
