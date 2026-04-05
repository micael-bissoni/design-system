import type { Meta, StoryObj } from '@storybook/angular';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { CardComponent } from '../../molecules/card/card.component';
import { StatCardComponent } from '../../molecules/stat-card/stat-card.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<DashboardLayoutComponent> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayoutComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CardComponent, StatCardComponent],
    }),
  ],
  argTypes: {
    appName: { control: 'text' },
    searchPlaceholder: { control: 'text' },
    hasNotifications: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<DashboardLayoutComponent>;

const items = [
  { id: 'dash', label: 'Dashboard', icon: 'chart-bar', active: true },
  { id: 'users', label: 'Users', icon: 'user-group', active: false },
  { id: 'inventory', label: 'Inventory', icon: 'cube', active: false },
  { id: 'reports', label: 'Reports', icon: 'document-report', active: false },
  { id: 'settings', label: 'Settings', icon: 'cog', active: false },
];

const user = {
  firstName: 'Micael',
  lastName: 'Bissoni',
  avatarSrc: 'https://i.pravatar.cc/150?u=micael',
};

export const Default: Story = {
  args: {
    appName: 'TREVVO',
    navigationItems: items,
    user,
    hasNotifications: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-dashboard-layout 
        [appName]="appName" 
        [navigationItems]="navigationItems" 
        [user]="user" 
        [hasNotifications]="hasNotifications"
      >
        <div class="space-y-8">
          <!-- Header info -->
          <div class="flex flex-col gap-1">
            <h1 class="text-3xl font-black text-gray-dark tracking-tighter">Bienvenido de nuevo, Micael</h1>
            <p class="text-gray-medium">Aquí tienes un resumen de lo que ha pasado en los últimos 30 días.</p>
          </div>

          <!-- Quick Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ds-stat-card 
              label="Total Revenue" 
              value="$432,190" 
              icon="cash" 
              trendValue="+12.5%" 
              trendDirection="up"
            ></ds-stat-card>
            <ds-stat-card 
              label="Active Subscriptions" 
              value="2,400" 
              icon="user-group" 
              trendValue="+4.2%" 
              trendDirection="up"
            ></ds-stat-card>
            <ds-stat-card 
              label="Sales Performance" 
              value="89%" 
              icon="chart-bar" 
              trendValue="-2.1%" 
              trendDirection="down"
            ></ds-stat-card>
            <ds-stat-card 
              label="Net Profit" 
              value="$45,000" 
              icon="currency-dollar" 
              trendValue="+0.5%" 
              trendDirection="neutral"
            ></ds-stat-card>
          </div>

          <!-- Main Layout Split -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 flex flex-col gap-8">
              <!-- Content Card -->
              <ds-card [hasHeader]="true" padding="none">
                <div card-header>
                  <h3 class="text-lg font-bold">Recent Transactions</h3>
                </div>
                <div class="p-0">
                   <div class="flex items-center justify-center h-64 text-gray-light font-bold uppercase tracking-widest bg-white">
                      [ Data Grid Placeholder ]
                   </div>
                </div>
              </ds-card>
            </div>

            <!-- Side Cards -->
            <div class="flex flex-col gap-8">
              <ds-card variant="elevated">
                <h3 class="text-lg font-bold mb-4">Account Health</h3>
                <div class="space-y-4">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-medium">Compliance</span>
                    <span class="font-bold text-success">98%</span>
                  </div>
                  <div class="w-full bg-gray-light h-2 rounded-full overflow-hidden">
                    <div class="bg-success h-full w-[98%]"></div>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-medium">Security</span>
                    <span class="font-bold text-warning">85%</span>
                  </div>
                  <div class="w-full bg-gray-light h-2 rounded-full overflow-hidden">
                    <div class="bg-warning h-full w-[85%]"></div>
                  </div>
                </div>
              </ds-card>

              <ds-card variant="outline">
                <h3 class="text-lg font-bold mb-2">New Update Released</h3>
                <p class="text-sm text-gray-medium mb-4">Version v0.2.1 includes performance improvements for the data grid.</p>
                <button class="w-full py-2 bg-primary text-white rounded-lg font-bold text-sm">Learn More</button>
              </ds-card>
            </div>
          </div>
        </div>
      </ds-dashboard-layout>
    `,
  }),
};

export const Mobile: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
