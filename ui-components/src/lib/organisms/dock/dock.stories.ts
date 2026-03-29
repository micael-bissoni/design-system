import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DockComponent } from './dock.component';
import { DockNavItemComponent } from '../../molecules/dock-nav-item/dock-nav-item.component';

const meta: Meta<DockComponent> = {
  title: 'Organisms/Dock',
  component: DockComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DockNavItemComponent],
    }),
  ],
  argTypes: {
    selectedCount: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<DockComponent>;

export const Default: Story = {
  args: {
    selectedCount: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-60 bg-gray-50 flex items-center justify-center p-10 relative">
        <ds-dock [selectedCount]="selectedCount">
          <div navigation class="flex gap-4">
            <ds-dock-nav-item [active]="true">
              <span icon>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="2.2" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.106-1.789L9 2m0 18l6-3m-6 3V4m6 13l5.447 2.724A2 2 0 0021 17.618V8.382a2 2 0 00-1.106-1.789L15 4m0 13V4m0 0L9 2"></path>
                </svg>
              </span>
              Regiões
            </ds-dock-nav-item>
            <ds-dock-nav-item [active]="false">
              <span icon>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="2.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </span>
              Entidades
            </ds-dock-nav-item>
          </div>
        </ds-dock>
      </div>
    `,
  }),
};

export const WithSelections: Story = {
  args: {
    selectedCount: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-60 bg-gray-50 flex items-center justify-center p-10 relative">
        <ds-dock [selectedCount]="selectedCount">
          <div navigation class="flex gap-4">
            <ds-dock-nav-item [active]="true">
              <span icon>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="2.2" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.106-1.789L9 2m0 18l6-3m-6 3V4m6 13l5.447 2.724A2 2 0 0021 17.618V8.382a2 2 0 00-1.106-1.789L15 4m0 13V4m0 0L9 2"></path>
                </svg>
              </span>
              Regiões
            </ds-dock-nav-item>
            <ds-dock-nav-item [active]="false">
              <span icon>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="2.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </span>
              Entidades
            </ds-dock-nav-item>
          </div>
        </ds-dock>
      </div>
    `,
  }),
};
