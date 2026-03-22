import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { IconComponent } from '../../atoms';
import { DSDatePipe, DSCurrencyPipe, LocaleService } from '../../utils';
import { Store } from '@ngrx/store';
import { selectI18nState } from '../../utils/state/i18n.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'ds-fundations',
  standalone: true,
  imports: [CommonModule, TranslatePipe, IconComponent, DSDatePipe, DSCurrencyPipe],
  templateUrl: './fundations.component.html',
})
export class FundationsComponent {
  today = new Date();

  private store = inject(Store);
  private localeState = this.store.select(selectI18nState);

  locale = this.localeState.pipe(map(state => state.locale));
  currency = this.localeState.pipe(map(state => state.currency));

  colorsSections = [
    {
      name: 'Brand',
      colors: [
        {
          name: 'Primary',
          value: 'bg-primary',
          onValue: 'text-on-primary',
        },
        {
          name: 'Secondary',
          value: 'bg-secondary',
          onValue: 'text-on-secondary',
        },
        {
          name: 'Tertiary',
          value: 'bg-tertiary',
          onValue: 'text-on-tertiary',
        },
      ]
    },
    {
      name: 'Status',
      colors: [
        {
          name: 'Success',
          value: 'bg-success',
          onValue: 'text-on-success',
        },
        {
          name: 'Warning',
          value: 'bg-warning',
          onValue: 'text-on-warning',
        },
        {
          name: 'Danger',
          value: 'bg-danger',
          onValue: 'text-on-danger',
        },
        {
          name: 'Info',
          value: 'bg-info',
          onValue: 'text-on-info',
        },
      ]
    },
    {
      name: 'Neutrals',
      colors: [
        {
          name: 'White',
          value: 'bg-white',
          onValue: 'text-on-white',
        },
        {
          name: 'Black',
          value: 'bg-black',
          onValue: 'text-on-black',
        },
        {
          name: 'Gray Light',
          value: 'bg-gray-light',
          onValue: 'text-on-gray-light',
        },
        {
          name: 'Gray Medium',
          value: 'bg-gray-medium',
          onValue: 'text-on-gray-medium',
        },
        {
          name: 'Gray Dark',
          value: 'bg-gray-dark',
          onValue: 'text-on-gray-dark',
        },
      ]
    }
  ];
}
