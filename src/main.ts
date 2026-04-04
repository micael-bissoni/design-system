import { bootstrapApplication } from '@angular/platform-browser';
import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FundationsComponent, provideDesignSystem } from '@trevvo/design-system/components';
import { provideStore } from '@ngrx/store';

import '@angular/common/locales/global/en';
import '@angular/common/locales/global/pt';
import '@angular/common/locales/global/es';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FundationsComponent],
  template: `
    <div class="p-8">
      <ds-fundations />
    </div>
  `,
})
export class AppComponent {
  constructor() {

  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(),
    provideHttpClient(withFetch()),
    provideDesignSystem({
      defaultLocale: 'pt-PT',
      defaultCurrency: 'EUR',
      defaultBrand: 'brand1',
      assetsUrl: './assets/i18n/' // Option to share url from another app assets
    })
  ],
}).catch((err) => console.error(err));
