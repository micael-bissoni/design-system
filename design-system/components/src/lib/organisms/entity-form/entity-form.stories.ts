import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { EntityFormComponent } from './entity-form.component';

const meta: Meta<EntityFormComponent> = {
  title: 'Organisms/MasterData/EntityForm',
  component: EntityFormComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<EntityFormComponent>;

export const Default: Story = {};
