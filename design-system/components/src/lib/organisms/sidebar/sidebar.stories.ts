import type { Meta, StoryObj } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';

const meta: Meta<SidebarComponent> = {
  title: 'Organisms/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  argTypes: {
    appName: { control: 'text' },
    collapsed: { control: 'boolean' },
    items: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<SidebarComponent>;

const items = [
  { id: 'dash', label: 'Dashboard', icon: 'chart-bar', active: true },
  { id: 'users', label: 'Users', icon: 'user-group', active: false },
  { id: 'settings', label: 'Settings', icon: 'cog', active: false },
  { id: 'help', label: 'Help Center', icon: 'question-mark-circle', active: false },
];

export const Default: Story = {
  args: {
    appName: 'TREVVO',
    items,
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    appName: 'TREVVO',
    items,
    collapsed: true,
  },
};
