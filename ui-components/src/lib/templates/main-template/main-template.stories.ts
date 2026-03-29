import { type Meta, type StoryObj } from '@storybook/angular';
import { MainTemplateComponent } from './main-template.component';

const meta: Meta<MainTemplateComponent> = {
  title: 'Templates/MainTemplate',
  component: MainTemplateComponent,
  tags: ['autodocs'],
  argTypes: {
    appName: { control: 'text' },
    title: { control: 'text' },
    navigationItems: { control: 'object' },
    user: { control: 'object' },
    headerSlot: { control: 'text' },
    asideSlot: { control: 'text' },
    contentSlot: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<MainTemplateComponent>;

/**
 * Story demonstrating the full template capability using modern inputs.
 * These inputs support internationalization through the TranslatePipe.
 */
export const FullTemplate: Story = {
  args: {
    appName: 'TREVVO',
    title: 'Dashboard Overview',
    user: {
      firstName: 'Micael',
      lastName: 'Bissoni',
      avatarSrc: '',
    },
    navigationItems: [
      { id: '1', label: 'Dashboard', route: '/dashboard', active: true, icon: 'dashboard' },
      { id: '2', label: 'Projects', route: '/projects', icon: 'folder' },
      { id: '3', label: 'Tasks', route: '/tasks', icon: 'task' },
      { id: '4', label: 'Team', route: '/team', icon: 'group' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-main-template 
        [appName]="appName" 
        [title]="title" 
        [user]="user" 
        [navigationItems]="navigationItems"
      >
      <div class="flex justify-center items-center w-full h-full text-secondary">content</div>
      </ds-main-template>
    `,
  }),
};