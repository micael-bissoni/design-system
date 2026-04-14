import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MasterDataTemplateComponent } from './master-data-template.component';
import { EntityFormComponent } from '../../organisms/entity-form/entity-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const meta: Meta<MasterDataTemplateComponent> = {
  title: 'Templates/MasterDataTemplate',
  component: MasterDataTemplateComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, EntityFormComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MasterDataTemplateComponent>;

export const EntityExample: Story = {
  args: {
    title: 'organisms.entityForm.sections.identification',
    subtitle: 'templates.masterData.entitySubtitle',
    icon: 'management'
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-master-data-template [title]="title" [subtitle]="subtitle" [icon]="icon">
        <ds-entity-form></ds-entity-form>
      </ds-master-data-template>
    `
  })
};
