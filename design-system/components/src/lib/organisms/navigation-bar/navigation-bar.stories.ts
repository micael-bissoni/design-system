import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NavigationBarComponent } from './navigation-bar.component';
import { NavigationBarItemComponent } from '../../molecules/navigation-bar-item/navigation-bar-item.component';
import { TranslatePipe } from '@ngx-translate/core';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<NavigationBarComponent> = {
  title: 'Organisms/NavigationBar',
  component: NavigationBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NavigationBarItemComponent, TranslatePipe],
    }),
  ],
  argTypes: {
    selectedCount: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<NavigationBarComponent>;

export const Default: Story = {
  args: {
    selectedCount: 0,
    navigationItems: [
      { id: '1', label: 'templates.mainTemplate.regions', active: true, icon: 'location-on' },
      { id: '2', label: 'templates.mainTemplate.entities', active: false, icon: 'corporate-fare' },
      { id: '3', label: 'templates.mainTemplate.users', active: false, icon: 'management' },
    ],
    appName: 'TREVVO',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('navbar-add-button');
    await userEvent.click(button);
  }
};

export const WithSelections: Story = {
  args: {
    selectedCount: 3,
    navigationItems: [
      { id: '1', label: 'templates.mainTemplate.regions', active: true },
      { id: '2', label: 'templates.mainTemplate.entities', active: false },
    ],
    appName: 'TREVVO',
  },
};
