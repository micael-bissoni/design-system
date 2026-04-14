import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { ClusterFormComponent } from './cluster-form.component';

const meta: Meta<ClusterFormComponent> = {
  title: 'Organisms/MasterData/ClusterForm',
  component: ClusterFormComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  args: {
    entityOptions: ['Farmácia Central', 'Laboratório Alfa', 'Armazenista Sul', 'Farmácia Moderna'],
    isSubmitting: false
  },
  argTypes: {
    isSubmitting: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<ClusterFormComponent>;

export const Default: Story = {};

export const Submitting: Story = {
  args: {
    isSubmitting: true
  }
};
