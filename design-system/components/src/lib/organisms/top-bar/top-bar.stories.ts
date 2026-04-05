import type { Meta, StoryObj } from '@storybook/angular';
import { TopBarComponent } from './top-bar.component';

const meta: Meta<TopBarComponent> = {
  title: 'Organisms/TopBar',
  component: TopBarComponent,
  tags: ['autodocs'],
  argTypes: {
    user: { control: 'object' },
    userRole: { control: 'text' },
    searchPlaceholder: { control: 'text' },
    hasNotifications: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<TopBarComponent>;

export const Default: Story = {
  args: {
    user: {
      firstName: 'Micael',
      lastName: 'Bissoni',
      avatarSrc: 'https://i.pravatar.cc/150?u=micael',
    },
    userRole: 'Administrator',
    searchPlaceholder: 'Search for reports, users...',
    hasNotifications: true,
  },
};

export const Guest: Story = {
  args: {
    user: null,
    userRole: 'Visitor',
    hasNotifications: false,
  },
};
