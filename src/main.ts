import { bootstrapApplication } from '@angular/platform-browser';
import { Component, importProvidersFrom, inject } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FundationsComponent, i18nReducer } from '@trevvo/design-system/components';

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
  private translate = inject(TranslateService);
  constructor() {
    this.translate.setDefaultLang('en-GB');
    this.translate.use('en-GB');
  }
}

// Translation loader factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideStore({
      i18n: i18nReducer
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
}).catch((err) => console.error(err));
