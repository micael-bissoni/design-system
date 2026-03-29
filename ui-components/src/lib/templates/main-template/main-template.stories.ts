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
    selectedCount: { control: 'number' },
    user: { control: 'object' },
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
      { id: '1', label: 'Regions', active: true, icon: 'location-on' },
      { id: '2', label: 'Entities', active: false, icon: 'corporate-fare' },
      { id: '3', label: 'Management', active: false, icon: 'management' },
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