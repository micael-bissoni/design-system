import { type Meta, type StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MainTemplateComponent } from './main-template.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationBarComponent } from '../../organisms/navigation-bar/navigation-bar.component';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';

const meta: Meta<MainTemplateComponent> = {
  title: 'Templates/MainTemplate',
  component: MainTemplateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TranslatePipe, NavigationBarComponent, AvatarComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MainTemplateComponent>;

/**
 * Basic usage of the empty base template.
 */
export const Empty: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-main-template>
        <div header class="flex justify-between items-center w-full">
           <h1 class="text-xl font-bold text-primary">Main Header Slot</h1>
           <ds-avatar firstName="Micael" lastName="Bissoni" size="md" />
        </div>
        
        <div navigation class="p-4">
           <p class="text-sm font-bold text-gray-medium uppercase">Navigation Slot</p>
           <nav class="mt-4 space-y-2">
             <div class="p-2 bg-primary/10 text-primary rounded font-bold">Dashboard</div>
             <div class="p-2 text-gray-medium">Settings</div>
           </nav>
        </div>

        <div class="flex justify-center items-center w-full h-[400px] text-gray-medium border-2 border-dashed border-gray-200 rounded-xl">
           Main Content Area
        </div>
      </ds-main-template>
    `,
  }),
};

/**
 * Demonstrating how to use MainTemplate with navigation items.
 */
export const WithNav: Story = {
  args: {
    appName: 'TREVVO',
    navigationItems: [
      { id: '1', label: 'Dashboard', active: true, icon: 'grid-view' },
      { id: '2', label: 'Users', active: false, icon: 'people' },
      { id: '3', label: 'Settings', active: false, icon: 'settings' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-main-template>
        <div header class="flex justify-between items-center w-full">
           <h1 class="text-xl font-bold text-primary">Dashboard</h1>
        </div>
        
        <ds-navigation-bar 
          navigation
          [appName]="appName"
          [navigationItems]="navigationItems"
        ></ds-navigation-bar>

        <div class="p-8 bg-white shadow-sm rounded-2xl">
           <h2 class="text-2xl font-black mb-4">Content Title</h2>
           <p class="text-gray-medium">This is an example of content inside the main template.</p>
        </div>
      </ds-main-template>
    `,
  }),
};