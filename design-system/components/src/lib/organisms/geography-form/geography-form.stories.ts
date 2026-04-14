import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { GeographyFormComponent } from './geography-form.component';

const meta: Meta<GeographyFormComponent> = {
  title: 'Organisms/MasterData/GeographyForm',
  component: GeographyFormComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<GeographyFormComponent>;

export const Default: Story = {};
