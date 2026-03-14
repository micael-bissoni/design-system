import type { Meta, StoryObj } from '@storybook/angular';
import { UiComponents } from './ui-components';
import { expect } from 'storybook/test';

const meta: Meta<UiComponents> = {
  component: UiComponents,
  title: 'UiComponents',
};
export default meta;

type Story = StoryObj<UiComponents>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/ui-components/gi)).toBeTruthy();
  },
};
