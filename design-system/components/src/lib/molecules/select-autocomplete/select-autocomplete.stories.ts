import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SelectAutocompleteComponent } from './select-autocomplete.component';

const meta: Meta<SelectAutocompleteComponent> = {
  title: 'Molecules/SelectAutocomplete',
  component: SelectAutocompleteComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
    moduleMetadata({
      imports: [CommonModule, TranslateModule.forRoot(), ReactiveFormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    class: { control: 'text' },
  },
  args: {
    placeholder: 'common.searchPlaceholder',
    options: [
      { label: 'Portugal', value: 'PT' },
      { label: 'Spain', value: 'ES' },
      { label: 'United Kingdom', value: 'GB' },
      { label: 'United States', value: 'US' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DE' },
      { label: 'Italy', value: 'IT' },
    ],
  },
};

export default meta;
type Story = StoryObj<SelectAutocompleteComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl min-h-[400px]">
        <div class="max-w-sm mx-auto">
          <ds-select-autocomplete 
            [options]="options"
            [placeholder]="placeholder"
            [class]="class"
          />
        </div>
      </div>
    `,
  }),
};

export const WithPreselectedValue: Story = {
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl('PT'),
    },
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl min-h-[400px]">
        <div class="max-w-sm mx-auto flex flex-col gap-4">
          <ds-select-autocomplete 
            [options]="options"
            [placeholder]="placeholder"
            [formControl]="control"
          />
          <div class="text-xs text-gray-medium bg-white p-4 rounded-xl border border-gray-light">
            Selected Value: <span class="font-mono text-primary">{{ control.value }}</span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ value: 'ES', disabled: true }),
    },
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl min-h-[400px]">
        <div class="max-w-sm mx-auto">
          <ds-select-autocomplete 
            [options]="options"
            [placeholder]="placeholder"
            [formControl]="control"
          />
        </div>
      </div>
    `,
  }),
};
