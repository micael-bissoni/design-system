import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EntityFormComponent } from './entity-form.component';
import { type SelectOption } from '../../atoms/select/select.component';

const entityTypeOptions: SelectOption[] = [
  { label: 'organisms.entityForm.types.lab', value: 'Laboratório' },
  { label: 'organisms.entityForm.types.ware', value: 'Armazenista' },
  { label: 'organisms.entityForm.types.pharm', value: 'Farmácia' }
];

const meta: Meta<EntityFormComponent> = {
  title: 'Organisms/EntityForm',
  component: EntityFormComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSave: { action: 'onSave' },
    onCancel: { action: 'onCancel' },
  },
  args: {
    entityTypeOptions
  }
};

export default meta;
type Story = StoryObj<EntityFormComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="w-full max-w-4xl">
          <ds-entity-form 
            [entityTypeOptions]="entityTypeOptions"
            (onSave)="onSave($event)" 
            (onCancel)="onCancel()">
          </ds-entity-form>
        </div>
      </div>
    `,
  }),
};

export const Prefilled: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="w-full max-w-4xl">
          <ds-entity-form 
            [entityTypeOptions]="entityTypeOptions"
            [ngModel]="entityData" 
            (onSave)="onSave($event)" 
            (onCancel)="onCancel()">
          </ds-entity-form>
        </div>
      </div>
    `,
  }),
  args: {
    // @ts-ignore - ngModel is handled by CVA
    entityData: {
      eik: 'LAB-772',
      type: 'Laboratório',
      name: 'Laboratório Central de Análises',
      vat: '253634020',
      isActive: true,
      logo: 'https://placehold.co/400x400?text=LAB'
    }
  }
};
